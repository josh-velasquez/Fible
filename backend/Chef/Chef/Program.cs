using Chef.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
        );

        builder.Host.UseSerilog();

        const string CORSPOLICY = "chefPolicy";

        builder.Services.AddControllers(option =>
        {
            // only accepts JSON objects
            option.ReturnHttpNotAcceptable = true;
        });

#if !DEBUG
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel
            .Information()
            .WriteTo
            .File("log/chefLogs.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();
#endif

#if DEBUG
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel
            .Debug()
            .WriteTo
            .File("log/chefLogs.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();

# endif

        builder.Services.AddCors(
            options =>
            {
                options
                .AddPolicy(
                    name: CORSPOLICY,
                    policy =>
                    {
                        policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

        var app = builder.Build();
        app.MapGet("/", () => "Welcome to Chef!");
        app.UseHttpsRedirection();
        app.UseCors(CORSPOLICY);

        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}