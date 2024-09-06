namespace stage_marche_devient.Repositories
{
    public interface IReserverRepository<T, TForeignKeyOne,TForeingKeyTwo>
    {
        Task<IEnumerable<T>> GetByUtilisateurId(TForeignKeyOne idUtilisateur);                   //Recupere par id etranger
        Task<IEnumerable<T>> GetBySessionId(TForeingKeyTwo idSession);
        Task<T> GetByIds(TForeignKeyOne idUtilisateur,TForeingKeyTwo idSession);
        Task<IEnumerable<T>> GetAll();              //Recupere tout
        Task<bool> Add(T model);                    //creer avec un retour bool pour verifier l'action
        Task<bool> Update(T model, TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);        // met a jour avec un retour bool pour verifier l'action
        Task<bool> Delete(TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);                 // supprime avec un retour bool pour verifier l'action
    }
}
