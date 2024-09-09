using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalHost",
builder => {
    builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
});
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
builder.Services.AddScoped<ThemeRepository>();
builder.Services.AddScoped<PublicationRepository>();




// Ajouter les services de logging
builder.Services.AddLogging();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowLocalHost");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
