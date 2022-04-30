using AspNetCoreRateLimit;
using fbcmanager_api.Configuration;
using fbcmanager_api.Database;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Services;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DatabaseContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAuthService, AuthService>();
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
app.UseHttpsRedirection();
app.UseCors("CorsPolicyAllowAll");
app.UseResponseCaching();
app.UseHttpCacheHeaders();
app.UseIpRateLimiting();
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