namespace stage_marche_devient.Repositories
{
    public interface IAuditRepository
    {
        Task CreationLog(string userName, string action, string entityName, string details = null);
    }
}
