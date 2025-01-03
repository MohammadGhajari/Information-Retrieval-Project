using Microsoft.EntityFrameworkCore;
using RankUp.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://127.0.0.10:8000") // Allow this specific origin
              .AllowAnyHeader()                     // Allow any headers
              .AllowAnyMethod()                     // Allow any HTTP methods
              .AllowCredentials();                  // Allow credentials (cookies, etc.)
    });
});

var app = builder.Build();

app.UseHttpsRedirection();

// Enable CORS middleware with the configured policy
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();
app.MapControllers();

app.Run();
