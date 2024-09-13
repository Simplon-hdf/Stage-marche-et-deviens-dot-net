using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [ApiController]
    [Route("Logs")]
    public class LogControlleur : ControllerBase
    {
        private readonly ApiDbContext _contexteBdd;
        private readonly IAuditRepository<AuditLog> _auditRepository;

        public LogControlleur (ApiDbContext contexteBdd, IAuditRepository<AuditLog> auditRepository)
        {
            _contexteBdd = contexteBdd;
            _auditRepository = auditRepository;
        }

        [HttpGet]                                              /*Indique que cette méthode répondra aux requêtes HTTP GET à l'URL définie 
                                                                 * par la route du contrôleur (par exemple, "api/utilisateurs")*/
        public async Task<ActionResult<IEnumerable<AuditLog>>> GetAllLogs() /*Déclare une méthode asynchrone qui retourne une liste de tous les logs 
                                                                                        * sous forme de Task<ActionResult<IEnumerable<Logs>>>*/
        {
            var logs = await _auditRepository.GetAll();      /*Appelle la méthode GetAll du repository pour récupérer tous les utilisateurs de la base de données*/
            return Ok(logs);                                 /*Retourne un code de réponse HTTP 200 OK 
                                                                 * avec la liste des utilisateurs en tant que corps de réponse*/
        }
    }
}
