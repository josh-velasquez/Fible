using Chef.Models;
using Microsoft.EntityFrameworkCore;

namespace Chef.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { 
        }

        public DbSet<Recipe> Recipe { get; set; }
    }
}
