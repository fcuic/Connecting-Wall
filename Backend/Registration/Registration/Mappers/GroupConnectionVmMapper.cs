using Microsoft.EntityFrameworkCore;
using Registration.Models;
using Registration.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Mappers
{
    public class GroupConnectionVmMapper
    {
        public static async Task<List<GroupConnectionVm>> Map(List<GroupConnection> connections, APIDBContext context)
        {
            var returnList = new List<GroupConnectionVm>();
            
            foreach (var connection in connections)
            {
                var termsOfGroupConnection = await context.Terms
                    .Where(x => x.GroupConnectionID == connection.ConnectionID)
                    .ToListAsync();

                var vm = new GroupConnectionVm()
                {
                    ConnectionID = connection.ConnectionID,
                    ConnectionName = connection.ConnectionName,
                    WallID = connection.WallID,
                    Terms = termsOfGroupConnection
                };

                returnList.Add(vm);
            }

            return returnList;
        }
    }
}
