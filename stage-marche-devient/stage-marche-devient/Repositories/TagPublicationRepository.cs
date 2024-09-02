using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    public class TagPublicationRepository : IRepository<TagPublicationModel, int>
    {
        private readonly ApiDbContext _context;
        public TagPublicationRepository(ApiDbContext context) => _context = context;

        public async Task<IEnumerable<TagPublicationModel>> GetAll()
        {
            IEnumerable<TagPublicationModel> tagPublications = await _context.Tag_Publication.ToArrayAsync();
            return tagPublications;
        }

        public async Task<TagPublicationModel> GetById(int id)
        {
            return await _context.Tag_Publication.FindAsync(id);
        }

        public async Task<bool> Add(TagPublicationModel model)
        {
            _context.Tag_Publication.Add(model);
            await _context.SaveChangesAsync();
            int id = model.IdTagPublication;
            return await _context.Tag_Publication.FindAsync(id) != null;
        }

        public async Task<bool> Delete(int id)
        {
            var tagPublicationToDelete = await _context.Tag_Publication.FindAsync(id);
            if (tagPublicationToDelete == null) { return false; }
            _context.Tag_Publication.Remove(tagPublicationToDelete);
            await _context.SaveChangesAsync();
            return await _context.Tag_Publication.FindAsync(id) == null;
        }

        public async Task<bool> Update(TagPublicationModel model, int id)
        {
            var dbTagPublication = await _context.Tag_Publication.FindAsync(id);
            if (dbTagPublication == null) { return false; }

            dbTagPublication.Nom = model.Nom;
            dbTagPublication.Couleur = model.Couleur;

            await _context.SaveChangesAsync();

            var dbVerifAction = await _context.Tag_Publication.FindAsync(id);
            return dbVerifAction.Nom == model.Nom &&
                   dbVerifAction.Couleur == model.Couleur;
        }
    }
}