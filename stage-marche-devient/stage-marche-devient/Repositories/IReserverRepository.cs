namespace stage_marche_devient.Repositories
{
    // Interface générique pour le repository Reserver
    // T : Type du modèle Reserver
    // TForeignKeyOne : Type de la première clé étrangère (ID de l'utilisateur)
    // TForeingKeyTwo : Type de la deuxième clé étrangère (ID de la session)
    public interface IReserverRepository<T, TForeignKeyOne, TForeingKeyTwo>
    {
        #region Create
        // Ajoute un nouveau Reserver
        // Retourne un booléen pour vérifier si l'opération a réussi
        Task<bool> Add(T model);
        #endregion

        #region Read
        // Récupère tous les Reserver associés à un ID d'utilisateur spécifique
        Task<IEnumerable<T>> GetByUtilisateurId(TForeignKeyOne idUtilisateur);

        // Récupère tous les Reserver associés à un ID de session spécifique
        Task<IEnumerable<T>> GetBySessionId(TForeingKeyTwo idSession);

        // Récupère un Reserver spécifique par ses IDs d'utilisateur et de session
        Task<T> GetByIds(TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);

        // Récupère tous les Reserver
        Task<IEnumerable<T>> GetAll();
        #endregion

        #region Update
        // Met à jour un Reserver existant
        // Retourne un booléen pour vérifier si l'opération a réussi
        Task<bool> Update(T model, TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);
        #endregion

        #region Delete
        // Supprime un Reserver par ses IDs d'utilisateur et de session
        // Retourne un booléen pour vérifier si l'opération a réussi
        Task<bool> Delete(TForeignKeyOne idUtilisateur, TForeingKeyTwo idSession);
        #endregion
    }
}