using AspNetCoreRateLimit;
using fbcmanager_api.Configuration;
using fbcmanager_api.Database;
using fbcmanager_api.Repositories;
using fbcmanager_api.Services;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DatabaseContext>(options => { options.EnableSensitiveDataLogging(); });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<TeamRepository>();
builder.Services.AddScoped<PractiseRepository>();
builder.Services.AddScoped<NewsRepository>();
builder.Services.AddScoped<FieldRepository>();
builder.Services.AddScoped<EventRepository>();
builder.Services.AddScoped<BookingRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<TokenUtils>();
builder.Services.AddMemoryCache();
builder.Services.ConfigureRateLimit();
builder.Services.AddHttpContextAccessor();
builder.Services.ConfigureApiVersioning();
builder.Services.ConfigureCors();
builder.Services.ConfigureHttpCacheHeaders();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.ConfigureIdentity();
builder.Services.ConfigureJwt(builder.Configuration);
builder.Services.AddAutoMapper(typeof(ObjectMapper));

var logger = new LoggerConfiguration()
    .ReadFrom
    .Configuration(builder.Configuration)
    .Enrich
    .FromLogContext()
    .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

builder.Services
    .AddControllers(config => {
        config
            .CacheProfiles
            .Add("duration120sec", new CacheProfile {Duration = 120});
    })
    .AddNewtonsoftJson(options => {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });


var app = builder.Build();

app.ConfigureExceptionHandler();
app.UseCors("CorsPolicyAllowAll");
app.UseResponseCaching();
app.UseHttpCacheHeaders();
app.UseIpRateLimiting();

// app.UseHsts();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


try {
    logger.Information("\n");
    logger.Information("fbcmanager-api is starting");
    app.Run();
}
catch (Exception e) {
    logger.Fatal(e, "fbcmanager-api failed to start");
}
finally {
    logger.Information("disposing logger");
    logger.Dispose();
}