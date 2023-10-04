using Chef;
using Serilog;


internal class Program
{
    private static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);
        builder.Host.UseSerilog();

        const string CORSPOLICY = "chefPolicy";

        builder.Services.AddControllers(option =>
        {
            // only accepts JSON objects
            option.ReturnHttpNotAcceptable = true;
        });

        builder.Services.AddSingleton(provider =>
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            string fullFilePath = Path.Combine(currentDirectory, "chefdatabase.db");

            string connectionString = $"Data Source={fullFilePath}";
            var chefDatabase = new ChefDatabase(connectionString);
            chefDatabase.CreateTable();
            return chefDatabase;
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
        app.UseStaticFiles();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}