namespace stage_marche_devient.Repositories
{
    public interface IAuditRepository
    {
        Task LogAsync(string userName, string action, string entityName, string details = null);
    }
}
