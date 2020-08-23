using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Models
{
    public class ApplicationSettings
    {
        public string JWT_Secret { get; set; }
        public string ClientURL { get; set; }
    }
}
