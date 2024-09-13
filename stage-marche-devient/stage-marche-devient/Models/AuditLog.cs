using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class AuditLog
    {
        [Column("id_log"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required]
        public int Id { get; set; }
        [Column("prenom_utilisateur"), Required]
        public string Utilisateur { get; set; } // L'utilisateur qui a effectué l'action
        [Column("prenom_utilisateur"), Required]
        public string Action { get; set; } // L'action exécutée (ex: "create", "update", "delete")
        [Column("prenom_utilisateur"), Required]
        public string EntityName { get; set; } // L'entité concernée (ex: "Order", "User")
        [Column("prenom_utilisateur"), Required]
        public string DateEvenement { get; set; } // La date et l'heure de l'action
        [Column("prenom_utilisateur"), Required]
        public string Details { get; set; } // Détails additionnels (optionnel)
    }
}
