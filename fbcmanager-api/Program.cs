using System.Net;
using AspNetCoreRateLimit;
using fbcmanager_api.Configuration;
using fbcmanager_api.Controllers;
using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Repositories;
using fbcmanager_api.Services;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
// var builder = WebApplication.CreateBuilder(new WebApplicationOptions {
//     ContentRootPath = Directory.GetCurrentDirectory(),
//     EnvironmentName = Environments.Production,
//     WebRootPath = "http://*:7285"
// });

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
builder.Services.Configure<ForwardedHeadersOptions>(options => {
    options.KnownProxies.Add(IPAddress.Parse("130.225.170.74"));
});
builder.Services.AddHttpsRedirection(options => {
    options.RedirectStatusCode = (int) HttpStatusCode.TemporaryRedirect;
    options.HttpsPort = 5001;
});
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("Bearer token", new OpenApiSecurityScheme {
        Description = "JWT Auth using Bearer scheme, type: Bearer [space] token, below to authenticate",
        Name = "Auth",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "0auth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
    options.SwaggerDoc("v1", new OpenApiInfo {Title = "Employee Management System API", Version = "v1"});
});

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ConfigureExceptionHandler();
// app.UseHttpsRedirection();
// app.UseForwardedHeaders(new ForwardedHeadersOptions {ForwardedHeaders = ForwardedHeaders.XForwardedProto});
app.UseCors("CorsPolicyAllowAll");
app.UseResponseCaching();
app.UseHttpCacheHeaders();
app.UseIpRateLimiting();

// app.UseExceptionHandler();
app.UseHsts();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


try {
    logger.Information("\n");
    logger.Information("ems-api is starting");
    app.Run();
}
catch (Exception e) {
    logger.Fatal(e, "ems-api failed to start");
}
finally {
    logger.Information("disposing logger");
    logger.Dispose();
}