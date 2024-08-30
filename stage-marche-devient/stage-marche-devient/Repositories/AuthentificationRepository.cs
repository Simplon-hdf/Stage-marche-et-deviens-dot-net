using stage_marche_devient.Data;
using System.Security.Cryptography;
using System.Text;
using stage_marche_devient.Models;


namespace stage_marche_devient.Repositorys
{
    public class AuthentificationRepository : IAuthentificationRepository
    {
        private readonly ApiDbContext _context;
        public AuthentificationRepository(ApiDbContext context) => _context = context;

        public UtilisateurModel Connexion(string mail, string password)
        {
            return _context.Utilisateur.FirstOrDefault(u => u.MailUtilisateur == mail && u.MdpUtilisateur == HashMdp(password));  
        }

        public void InscriptionUtilisateur(UtilisateurModel user)
        {
            _context.Utilisateur.Add(user);
            _context.SaveChanges();
        }

        private string HashMdp(string password)
        {
            using (var sha512 = SHA512.Create())
            {
                var hashedBytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}
