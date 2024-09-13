using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    public class AuditRepository : IAuditRepository
    {
        private readonly ApiDbContext _dbContext;

        public AuditRepository(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreationLog(string userName, string action, string entityName, string details = null)
        {
            var auditLog = new AuditLog
            {
                Utilisateur = userName,
                Action = action,
                EntityName = entityName,
                DateEvenement = DateTime.Now.ToString(),
                Details = details
            };

            _dbContext.AuditLogs.Add(auditLog);
            await _dbContext.SaveChangesAsync();
        }
    }
}
