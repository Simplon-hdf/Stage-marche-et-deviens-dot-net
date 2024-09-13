using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using stage_marche_devient.Data;
using stage_marche_devient.Repositories;
using System.Text;
using System.Threading.RateLimiting;//implementation de mon IAR



var builder = WebApplication.CreateBuilder(args);

// Configuration des services, y compris CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentCorsPolicy", builder =>
    {
        builder
            .WithOrigins("http://localhost:4200") // Remplacer par le port utilisé par votre application Angular
            .WithMethods("GET", "POST", "DELETE") // Limiter aux méthodes nécessaires
            .AllowAnyHeader(); // Vous pouvez restreindre aux en-têtes nécessaires
    });
});

// Configurer le serveur pour utiliser HTTPS
builder.WebHost.UseKestrel(options =>
{
    options.AddServerHeader = false; // Optionnel : masquer l'en-tête serveur
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations(); // active le module Swashbuckle Annotation
    // Autres configurations Swagger...
});

builder.Services.AddDbContext<ApiDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DataBaseContexteClasse");
    var serverVersion = ServerVersion.AutoDetect(connectionString);
    options.UseMySql(connectionString, serverVersion);
});
// Enregistrer le service IAuthentificationRepository
builder.Services.AddScoped<IAuthentificationRepository, AuthentificationRepository>();
builder.Services.AddScoped<SessionRepository>();
builder.Services.AddScoped<IAuditRepository, AuditRepository>();
builder.Services.AddScoped<ThemeRepository>();
builder.Services.AddScoped<PublicationRepository>();

// Ajouter Rate Limiting avec Fixed Window
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
    {
        var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString();
        return RateLimitPartition.GetFixedWindowLimiter(ipAddress!, partition => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 5, // Nombre maximum de requêtes
            Window = TimeSpan.FromMinutes(1), // Fenêtre de temps de 1 minute
            QueueProcessingOrder = QueueProcessingOrder.OldestFirst, // Ordre de la file d'attente
            QueueLimit = 0 // Pas de file d'attente
        });
    });
});

// Ajouter Rate Limiting avec Sliding Window
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
    {
        var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString();
        return RateLimitPartition.GetSlidingWindowLimiter(ipAddress!, partition => new SlidingWindowRateLimiterOptions
        {
            PermitLimit = 5, // Nombre maximum de requêtes
            Window = TimeSpan.FromMinutes(1), // Durée de la fenêtre
            SegmentsPerWindow = 4, // Divise la fenêtre en 4 segments
            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
            QueueLimit = 0
        });
    });
});

builder.Services.AddRateLimiter(options =>
{
    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.StatusCode = 429; // Code 429 Too Many Requests
        await context.HttpContext.Response.WriteAsync("Trop de requêtes. Réessayez plus tard.", cancellationToken);
    };
});

// Ajouter les services de logging
builder.Services.AddLogging();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-XSRF-TOKEN"; // Nom de l'en-tête pour le token CSRF
});

var app = builder.Build();


// Middleware pour ajouter les en-têtes CSP
app.Use(async (context, next) =>
{
    // Si Swagger est demandé, on ajuste les directives CSP
    if (context.Request.Path.StartsWithSegments("/swagger"))
    {
        context.Response.Headers.Append("Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://unpkg.com; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "font-src 'self' https://cdnjs.cloudflare.com; " +
            "connect-src 'self';");
    }
    else
    {
        // Pour le reste de l'application Angular, applique une CSP plus restrictive
        context.Response.Headers.Append("Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "font-src 'self'; " +
            "connect-src 'self';");
    }
    if (context.Request.Path.StartsWithSegments("/swagger"))
    {
        // Désactiver la protection CSRF uniquement pour les requêtes Swagger
        var antiforgeryService = context.RequestServices.GetRequiredService<IAntiforgery>();
        var tokenSet = antiforgeryService.GetAndStoreTokens(context);
    }

    await next();
});

if (!app.Environment.IsDevelopment())
{
    app.UseHsts(); // Active HSTS en production
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("DevelopmentCorsPolicy");
}

// Utiliser la politique CORS
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseRateLimiter();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/csrf-token", (IAntiforgery antiforgery, HttpContext context) =>
{
    var tokens = antiforgery.GetAndStoreTokens(context);
    return Results.Ok(new { token = tokens.RequestToken });
});

app.MapControllers();

app.Run();