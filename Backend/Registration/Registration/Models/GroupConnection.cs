using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Registration.Models
{
    public class GroupConnection
    {
        [Key]
        public Guid ConnectionID { get; set; }
        [Required]
        public string ConnectionName { get; set; }
        public char ConnectionGroup { get; set; }
        [ForeignKey("WallID"), Required]
        public Guid WallID { get; set; }
        public virtual Wall Wall { get; set; }
        public ICollection<Term> Terms { get; set; }
    }
}
