using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThemeController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly ThemeRepository _repository;
        private readonly ILogger<ThemeController> _logger;
        private readonly IAuditRepository<AuditLog> _auditRepository;

        public ThemeController(ApiDbContext context, IAuditRepository<AuditLog> auditRepository, ILogger<ThemeController> logger, ILogger<ThemeRepository> themeLogger)
        {
            _context = context;
            _repository = new ThemeRepository(_context, themeLogger);
            _logger = logger;
            _auditRepository = auditRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Theme>>> GetAllTheme()
        {
            var theme = await _repository.GetAll();                                                         //recupere depuis le repo ttes les données
            return Ok(theme);                                                                               // retourne vers le front les données récupérees
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Theme>> GetTheme(int id)
        {
            var theme = await _repository.GetById(id);                                                      //recupere les données depuis le repo
            if (theme == null)                                                                              //si les données sont null on found vers le endpoint
            {
                return NotFound();                                                                              //retourne un not found vers le endpoint (code 404)
            }
            return Ok(theme);                                                                               //retourne vers le front les données récupéree(code 200)
        }

        [HttpPost]

        public async Task<ActionResult<Theme>> CreateTheme(Theme theme)
        {
            var result = await _repository.Add(theme);                                                      //envoie vers le repo l'objet et stock le boolean de retour
            if (result)                                                                                         //si le boolean de retour est true
            {
                await _auditRepository.CreationLog(theme.IdTheme.ToString(), "Ajout", "Thème", "Nouveau thème ajouté.");
                return CreatedAtAction(nameof(GetTheme), new { id = theme.IdTheme }, theme);    // renvoi vers le endpoint l'objet qui vient d'être crée
            }
            return BadRequest();                                                                                // envoi un badresquest (code 400)
        }

        [HttpPut("{id}")]

        public async Task<ActionResult> UpdateTheme(int id, Theme theme)
        {
            if (id != theme.IdTheme)                                                                    //vérifie si la donnée que l'on veut update est bien celle avec cet id
            {
                return BadRequest();                                                                            //rebvoie un bad request (code 400)
            }

            var result = await _repository.Update(theme, id);                                               // envoi vers le repository l'objet a update et son id
            if (result)
            {
                await _auditRepository.CreationLog(theme.IdTheme.ToString(), "Mise à jour", "Thème", "Thème mis à jour.");
                return Ok("Modificaton réussie");                                                               // renvoi un ok(code 200)
            }

            return NotFound();                                                                                  // renvoie un not found (code 404)
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTheme(int id)
        {
            var result = await _repository.Delete(id);                                                          // envoi un requete de deletion vers le repository et stock le retour
            if (result)                                                                                         // si le retour est positive
            {
                await _auditRepository.CreationLog(id.ToString(), "Supprimer", "Thème", "Le thème a été supprimé.");
                return Ok("Supression reussie");                                                                // revoi un ok (code ~200) 
            }
            if(_repository.GetById(id) != null)
            {
                return Ok("Supression reussie");
            }

            _logger.LogError("Erreur lors de la suppression du thème avec ID {Id}", id);

            return NotFound();                                                                                  // revoie un not found (code 404)
        }

    }
}