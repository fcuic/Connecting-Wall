using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Registration.Models
{
    public class Wall
    {
        [Key]
        public Guid WallID { get; set; }
        [Required]
        public string WallName { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        [ForeignKey("UserID"), Required]
        public string UserID { get; set; }
        public virtual ApplicationUser User { get; set; }
        //public GroupConnection GroupAConnection { get; set; }
        //public GroupConnection GroupBConnection { get; set; }
        //public GroupConnection GroupCConnection { get; set; }
        //public GroupConnection GroupDConnection { get; set; }
    }
}
