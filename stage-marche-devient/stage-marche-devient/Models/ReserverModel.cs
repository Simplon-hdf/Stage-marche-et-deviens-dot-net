using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace stage_marche_devient.Models
{
    [Keyless]
    public class Reserver
    {
        [Column("Id_utilisateur"), Required]
        public int IdUtilisateur { get; set; }

        [Column("Id_session"), Required]
        public int IdSession { get; set; }

        [Column("Nbr_participants_inscrits"), Required]
        public int NbrParticipantsInscrits { get; set; }

        [Column("Ref_Reservation"), Required]
        public string RefReservation { get; set; }

        [Column("Date_Paiement"), Required]
        public string DatePaiement  { get; set; }

        [Column("Validation_Reservation"), Required]
        public bool ValidationReservation { get; set; }

        [Column("Nbr_actuel_participant"), Required]
        public int NbrActuelParticipant  { get; set; }
}
}
