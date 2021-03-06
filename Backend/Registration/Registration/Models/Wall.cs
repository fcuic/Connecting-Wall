﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Registration.Models
{
    public class Wall
    {
        [Key]
        public Guid wallID { get; set; }
        [Required]
        public string wallName { get; set; }
        public DateTime dateCreated { get; set; } = DateTime.Now;
        public DateTime? dateUpdated { get; set; }
        [ForeignKey("userID")]
        public string userID { get; set; }
        public virtual ApplicationUser User { get; set; }

        public List<Term> groupATerms { get; set; }
        public List<Term> groupBTerms { get; set; }
        public List<Term> groupCTerms { get; set; }
        public List<Term> groupDTerms { get; set; }
        public List<GroupConnections> groupAConnections { get; set; }
        public List<GroupConnections> groupBConnections { get; set; }
        public List<GroupConnections> groupCConnections { get; set; }
        public List<GroupConnections> groupDConnections { get; set; }

    }
}
