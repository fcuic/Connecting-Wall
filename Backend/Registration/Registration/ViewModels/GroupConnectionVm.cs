using Registration.Models;
using System.Collections.Generic;

namespace Registration.ViewModels
{
    public class GroupConnectionVm : GroupConnection
    {
        public List<Term> Terms { get; set; }
    }
}
