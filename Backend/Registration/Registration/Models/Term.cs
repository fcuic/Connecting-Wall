using System;
using System.ComponentModel.DataAnnotations;

namespace Registration.Models
{
    public class Term
    {
        [Key]
        public Guid termID { get; set; }
        public string termName { get; set; }
    }
}
