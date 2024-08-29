namespace stage_marche_devient.Repositorys
{
    public interface IAuthentificationRepository
    {
            Utilisateur Connexion(string mail, string password);
            void InscriptionUtilisateur(Utilisateur user);
    }
}
