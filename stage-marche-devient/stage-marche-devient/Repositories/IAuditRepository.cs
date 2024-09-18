namespace stage_marche_devient.Repositories
{
    public interface IAuditRepository<T>
    {
        Task CreationLog(string userName, string action, string entityName, string details = null);

        Task<IEnumerable<T>> GetAll();    
    }
}
