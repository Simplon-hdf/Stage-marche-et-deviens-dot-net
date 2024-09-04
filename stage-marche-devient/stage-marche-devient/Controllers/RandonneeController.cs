using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RandonneeController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly RandonneeRepository _repository;

        public RandonneeController(ApiDbContext context)
        {
            _context = context;
            _repository = new RandonneeRepository(_context);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Randonnee>>> GetAllRandonnee()
        {
            var randonnee = await _repository.GetAll();                                                         //recupere depuis le repo ttes les données
            return Ok(randonnee);                                                                               // retourne vers le front les données récupérees
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Randonnee>> GetRandonnee(int id)
        {
            var randonnee = await _repository.GetById(id);                                                      //recupere les données depuis le repo
            if (randonnee == null)                                                                              //si les données sont null on found vers le endpoint
            {
                return NotFound();                                                                              //retourne un not found vers le endpoint (code 404)
            }
            return Ok(randonnee);                                                                               //retourne vers le front les données récupéree(code 200)
        }

        [HttpPost]

        public async Task<ActionResult<Randonnee>> CreateRandonnee(Randonnee randonnee)
        {
            var result = await _repository.Add(randonnee);                                                      //envoie vers le repo l'objet et stock le boolean de retour
            if (result)                                                                                         //si le boolean de retour est true
            {
                return CreatedAtAction(nameof(GetRandonnee), new { id = randonnee.IdRandonnee }, randonnee);    // renvoi vers le endpoint l'objet qui vient d'être crée
            }
            return BadRequest();                                                                                // envoi un badresquest (code 400)
        }

        [HttpPut("{id}")]

        public async Task<ActionResult> UpdateRandonnee(int id, Randonnee randonnee)
        {
            if (id != randonnee.IdRandonnee)                                                                    //vérifie si la donnée que l'on veut update est bien celle avec cet id
            {
                return BadRequest();                                                                            //rebvoie un bad request (code 400)
            }

            var result = await _repository.Update(randonnee, id);                                               // envoi vers le repository l'objet a update et son id
            if (result)
            {
                return Ok("Modificaton réussie");                                                               // renvoi un ok(code 200)
            }

            return NotFound();                                                                                  // renvoie un not found (code 404)
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRandonnee(int id)
        {
            if (id <= 0)
            {
                return BadRequest("L'identifiant doit être un nombre positif.");
            }

            try
            {
                var existingRandonnee = await _repository.GetById(id);
                if (existingRandonnee == null)
                {
                    return NotFound($"Aucune randonnée trouvée avec l'ID {id}.");
                }

                bool result = await _repository.Delete(id);
                if (await _repository.GetById(id) == null)
                {
                    return Ok($"Suppression réussie de la randonnée avec l'ID {id}.");
                }
                else
                {
                    // Si la suppression échoue pour une raison quelconque
                    return StatusCode(500, $"La suppression de la randonnée avec l'ID {id} a échoué pour une raison inconnue.");
                }
            }
            catch (Exception ex)
            {
                // Log l'exception
                Console.WriteLine(ex.Message, $"Une erreur est survenue lors de la suppression de la randonnée avec l'ID {id}.");
                return StatusCode(500, "Une erreur interne est survenue lors de la suppression. Veuillez réessayer plus tard.");
            }
        }

    }
}
