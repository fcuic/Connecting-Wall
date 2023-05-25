using System;
using System.ComponentModel.DataAnnotations;

namespace Registration.Models
{
    public class GroupConnections
    {
        [Key]
        public Guid connectionId { get; set; }
        public string connectionName { get; set; }
    }
}
