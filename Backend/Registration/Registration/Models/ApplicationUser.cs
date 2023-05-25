using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Registration.Models
{
    public class ApplicationUser : Microsoft.AspNetCore.Identity.IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
        public virtual ICollection<Wall> Wall { get; set; }
    }
}
