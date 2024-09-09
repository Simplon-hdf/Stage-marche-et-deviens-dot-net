using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicationController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly PublicationRepository _repository;
        private readonly ILogger<PublicationController> _logger;


        public PublicationController(ApiDbContext context, ILogger<PublicationController> logger, ILogger<PublicationRepository> publicationLogger)
        {
            _context = context;
            _repository = new PublicationRepository(_context,publicationLogger);
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Publication>>> GetAllPublication()
        {
            var publication = await _repository.GetAll();                                                                 //recupere depuis le repo ttes les données
            return Ok(publication);                                                                                       // retourne vers le front les données récupérees
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Publication>> GetPublication(int id)
        {
            var publication = await _repository.GetById(id);                                                             //recupere les données depuis le repo
            if (publication == null)                                                                                     //si les données sont null on found vers le endpoint
            {
                return NotFound();                                                                                       //retourne un not found vers le endpoint (code 404)
            }
            return Ok(publication);                                                                                      //retourne vers le front les données récupéree(code 200)
        }

        [HttpPost]

        public async Task<ActionResult<Publication>> CreatePublication(Publication publication)
        {
            var result = await _repository.Add(publication);                                                            //envoie vers le repo l'objet et stock le boolean de retour
            if (result)                                                                                                 //si le boolean de retour est true
            {
                return CreatedAtAction(nameof(GetPublication), new { id = publication.IdPublication }, publication);    // renvoi vers le endpoint l'objet qui vient d'être crée
            }
            return BadRequest();                                                                                        // envoi un badresquest (code 400)
        }

        [HttpPut("{id}")]

        public async Task<ActionResult> UpdatePublication(int id, Publication publication)
        {
            if (id != publication.IdPublication)                                                                        //vérifie si la donnée que l'on veut update est bien celle avec cet id
            {
                return BadRequest();                                                                                    //rebvoie un bad request (code 400)
            }

            var result = await _repository.Update(publication, id);                                                     // envoi vers le repository l'objet a update et son id
            if (result)
            {
                return Ok("Modificaton réussie");                                                                       // renvoi un ok(code 200)
            }

            return NotFound();                                                                                          // renvoie un not found (code 404)
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublication(int id)
        {
            var result = await _repository.Delete(id);                                                                  // envoi un requete de deletion vers le repository et stock le retour
            if (result)                                                                                                 // si le retour est positive
            {
                return Ok("Supression reussie");                                                                        // revoi un ok (code ~200) 
            }
            return NotFound();                                                                                          // revoie un not found (code 404)
        }
    }
}
