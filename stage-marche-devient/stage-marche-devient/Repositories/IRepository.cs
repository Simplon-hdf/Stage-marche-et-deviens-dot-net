namespace stage_marche_devient.Repositories
{
    public interface IRepository<T, TKey>
    {
        Task<T> GetById(TKey id);                   //Recupere par un id
        Task<IEnumerable<T>> GetAll();              //Recupere tout
        Task<bool> Add(T model);                    //creer avec un retour bool pour verifier l'action
        Task<bool> Update(T model, TKey id);        // met a jour avec un retour bool pour verifier l'action
        Task<bool> Delete(TKey id);                 // supprime avec un retour bool pour verifier l'action
    }
}
