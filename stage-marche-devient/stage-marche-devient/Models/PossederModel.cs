﻿using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class PossederModel
    {
        [Column("Id_publication"), Required, ForeignKey("Publication")]
        public int idPublication { get; set; }

        [Column("Id_tag_publication"), Required, ForeignKey("Tag_Publication")]
        public int idTagPublication { get; set; }

    }
}