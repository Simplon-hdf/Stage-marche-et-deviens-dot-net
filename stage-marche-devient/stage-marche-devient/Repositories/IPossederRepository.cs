namespace stage_marche_devient.Repositories
{
    public interface IPossederRepository<T, TForeignKeyOne, TForeingKeyTwo>
    {
        Task<T> GetById(TForeignKeyOne idPublication, TForeingKeyTwo idTagPublication);                   //Recupere par 2 id etranger
        Task<IEnumerable<T>> GetAll();              //Recupere tout
        Task<bool> Add(T model);                    //creer avec un retour bool pour verifier l'action
        Task<bool> Update(T model, TForeignKeyOne idPublication, TForeingKeyTwo idTagPublication);        // met a jour avec un retour bool pour verifier l'action
        Task<bool> Delete(TForeignKeyOne idPublication, TForeingKeyTwo idTagPublication);                 // supprime avec un retour bool pour verifier l'action
    }
}