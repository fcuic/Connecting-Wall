using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Registration.Models
{
    public class GroupConnections
    {
        [Key]
        public Guid connectionId { get; set; }
        public string connectionName { get; set; }
        //[ForeignKey("wallID")]
        //public Guid wallID { get; set; }
        //[ForeignKey("wallID1")]
        //public Guid wallID1 { get; set; }
        //[ForeignKey("wallID2")]
        //public Guid wallID2 { get; set; }
        //[ForeignKey("wallID3")]
        //public Guid wallID3 { get; set; }
    }
}
