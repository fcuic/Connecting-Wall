using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace Registration.Models
{
    public class GroupConnections
    {
        [Key]
        public Guid connectionId { get; set; }
        public string connectionName { get; set; }
    }
}
