﻿using Registration.Models;
using System.Collections.Generic;

namespace Registration.ViewModels
{
    public class WallVm : Wall
    {
        public List<GroupConnectionVm> GroupConnections { get; set; }
    }
}
