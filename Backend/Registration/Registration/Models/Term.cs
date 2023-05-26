using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Registration.Models
{
    public class Term
    {
        [Key]
        public Guid TermID { get; set; }
        [Required]
        public string TermName { get; set; }
        [ForeignKey("GroupConnectionID"), Required]
        public Guid GroupConnectionID { get; set; }
        public virtual GroupConnection GroupConnection { get; set; }
    }
}
