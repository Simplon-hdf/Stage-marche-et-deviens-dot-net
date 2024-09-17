using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class AuditLog
    {
        [Column("id_evenement"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required]
        public int Id { get; set; }
        [Column("cible_action"), Required]
        public string Utilisateur { get; set; } // Quels entité a été ciblé
        [Column("action_realise"), Required]
        public string Action { get; set; } // L'action exécutée (ex: "create", "update", "delete")
        [Column("type_donnee"), Required]
        public string EntityName { get; set; } // L'entité concernée (ex: "Inscription", "Utilisateur", "Randonnee")
        [Column("date_evenement"), Required]
        public string DateEvenement { get; set; } // La date et l'heure de l'action
        [Column("details_evenement"), Required]
        public string Details { get; set; } // Détails additionnels (optionnel)
    }
}
