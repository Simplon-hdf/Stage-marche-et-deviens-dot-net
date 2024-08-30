using stage_marche_devient.Models;

namespace stage_marche_devient.Repositorys

{
    public interface IAuthentificationRepository
    {
            UtilisateurModel Connexion(string mail, string password);
            void InscriptionUtilisateur(UtilisateurModel user);
    }
}
