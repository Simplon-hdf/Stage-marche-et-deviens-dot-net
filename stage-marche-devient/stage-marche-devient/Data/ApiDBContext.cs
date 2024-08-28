using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Models;

namespace stage_marche_devient.Data
{
    public class ApiDBContext : DbContext
    {
        public ApiDBContext()
        {
        }

        public ApiDBContext(DbContextOptions<ApiDBContext> options) : base(options)
        {
        }

        public virtual DbSet<ReserverModel> Reservers { get; set; }
    }
}
