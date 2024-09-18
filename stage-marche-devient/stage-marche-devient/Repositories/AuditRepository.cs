using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    public class AuditRepository : IAuditRepository<AuditLog>
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

        [HttpGet]
        public async Task<IEnumerable<AuditLog>> GetAll()                             /* Je déclare une méthode publique asynchrone qui retourne 
                                                                                       * une liste de tous les logs.*/
        {
            IEnumerable<AuditLog> logs = await _dbContext.AuditLogs.ToArrayAsync();   /*Récupère tous les logs de la base de données 
                                                                                                        * sous forme de tableau asynchrone.*/
            return logs;                                                              /*     Retourne la liste des logs*/
        }
    }
}
