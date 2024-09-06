namespace stage_marche_devient.Repositories
{
    // Interface générique pour le repository Posseder
    // T : Type du modèle Posseder
    // TForeignKeyOne : Type de la première clé étrangère (ID de publication)
    // TForeingKeyTwo : Type de la deuxième clé étrangère (ID de tag)
    public interface IPossederRepository<T, TForeignKeyOne, TForeingKeyTwo>
    {
        #region Create
        // Ajoute un nouveau Posseder
        // Retourne un booléen pour vérifier si l'opération a réussi
        Task<bool> Add(T model);
        #endregion

        #region Read
        // Récupère un Posseder par son ID
        Task<T> GetById(int possederId);

        // Récupère tous les Posseder associés à un ID de publication spécifique
        Task<IEnumerable<T>> GetByPublicationId(TForeignKeyOne idPublication);

        // Récupère tous les Posseder associés à un ID de tag spécifique
        Task<IEnumerable<T>> GetByTagId(TForeingKeyTwo idTagPublication);

        // Récupère un Posseder spécifique par ses IDs de publication et de tag
        Task<T> GetByIds(TForeignKeyOne idPublication, TForeingKeyTwo idTagPublication);

        // Récupère tous les Posseder
        Task<IEnumerable<T>> GetAll();
        #endregion

        #region Update
        // Met à jour un Posseder existant
        // Retourne un booléen pour vérifier si l'opération a réussi
        Task<bool> Update(T model, int idPosseder);
        #endregion

        #region Delete
        // Supprime un Posseder par son ID
        // Retourne un booléen pour vérifier si l'opération a réussi
        Task<bool> Delete(int idPosserder);
        #endregion
    }
}