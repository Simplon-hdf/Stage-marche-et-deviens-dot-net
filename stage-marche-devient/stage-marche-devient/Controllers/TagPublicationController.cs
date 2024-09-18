using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagPublicationController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly TagPublicationRepository _repository;
        private readonly IAuditRepository<AuditLog> _auditRepository;

        public TagPublicationController(ApiDbContext context, IAuditRepository<AuditLog> auditRepository)
        {
            _context = context;
            _repository = new TagPublicationRepository(_context);
            _auditRepository = auditRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagPublicationModel>>> GetAllTagPublications()
        {
            var tagPublications = await _repository.GetAll();
            return Ok(tagPublications);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TagPublicationModel>> GetTagPublication(int id)
        {
            var tagPublication = await _repository.GetById(id);
            if (tagPublication == null)
            {
                return NotFound();
            }
            return Ok(tagPublication);
        }

        [HttpPost]
        public async Task<ActionResult<TagPublicationModel>> CreateTagPublication(TagPublicationModel tagPublication)
        {
            var result = await _repository.Add(tagPublication);
            if (result)
            {
                await _auditRepository.CreationLog(tagPublication.IdTagPublication.ToString(), "Ajout", "Tag Publication", "Nouveau tag de publication ajouté.");
                return CreatedAtAction(nameof(GetTagPublication), new { id = tagPublication.IdTagPublication }, tagPublication);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTagPublication(int id, TagPublicationModel tagPublication)
        {
            if (id != tagPublication.IdTagPublication)
            {
                return BadRequest();
            }

            var result = await _repository.Update(tagPublication, id);
            if (result)
            {
                await _auditRepository.CreationLog(tagPublication.IdTagPublication.ToString(), "Mise à jour", "Tag Publication", "Mise à jour d'un tag de publication.");
                return Ok("Modification réussie");
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTagPublication(int id)
        {
            var result = await _repository.Delete(id);
            if (result)
            {
                await _auditRepository.CreationLog(id.ToString(), "Supprimer", "Tag Publication", "Tag de publication supprimé.");
                return Ok("Suppression réussie");
            }
            return NotFound();
        }
    }
}