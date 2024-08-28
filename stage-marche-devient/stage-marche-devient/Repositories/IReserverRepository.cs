namespace stage_marche_devient.Repositories
{
    public interface IReserverRepository<T, TForeignKeyOne,TForeingKeyTwo>
    {
        Task<T> GetById(TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);                   //Recupere par 2 id etranger
        Task<IEnumerable<T>> GetAll();              //Recupere tout
        Task<bool> Add(T model);                    //creer avec un retour bool pour verifier l'action
        Task<bool> Update(T model, TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);        // met a jour avec un retour bool pour verifier l'action
        Task<bool> Delete(TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);                 // supprime avec un retour bool pour verifier l'action
    }
}
