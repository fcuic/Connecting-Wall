using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registration.Models;
using Registration.Requests;

namespace Registration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WallController : ControllerBase
    {
        private readonly APIDBContext _context;

        public WallController(APIDBContext context)
        {
            _context = context;
        }

        // GET: api/Wall
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wall>>> GetWalls(string userId)
        {
            var walls = _context.Walls
                .Include(p => p.User)
                .AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                walls = walls.Where(x => string.Equals(x.UserID, userId));
            }

            return (await walls.ToListAsync());
        }

        [HttpGet("GetWallsByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Wall>>> GetWallsByUserId(string userId)
        {
            return await _context.Walls
                .Where(w => w.UserID == userId)
                .Include(p => p.User)
                .ToListAsync();
        }

        // GET: api/Wall/5
        [HttpGet("WallDetails/{id}")]
        public async Task<ActionResult<Wall>> GetWallDetails(Guid id)
        {
            try
            {
                var wall = await _context.Walls
                    .Include(p => p.User)
                    .Include(p => p.GroupConnections)
                    .ThenInclude(e => e.Terms)
                    .Where(x => x.WallID == id)
                    .FirstOrDefaultAsync();

                if (wall == null)
                {
                    return NotFound();
                }

                return wall;
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        [Route("UpdateWall")]
        public async Task<IActionResult> PutWall([FromBody] WallUpdateRequest updatedWall)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var wall = await _context.Walls
                          .Where(x => x.WallID == new Guid(updatedWall.WallID))
                          .FirstOrDefaultAsync();

                if (wall == null)
                {
                    return NotFound();
                }

                if (wall.WallName != updatedWall.WallName)
                {
                    wall.WallName = updatedWall.WallName;
                }

                var groupAConnection = await _context.GroupConnections
                    .Include(x => x.Terms)
                    .Where(x => x.WallID == new Guid(updatedWall.WallID) && x.ConnectionGroup == 'A')
                    .FirstOrDefaultAsync()
                    ;

                if (groupAConnection.ConnectionName != updatedWall.GroupAConnectionName)
                {
                    groupAConnection.ConnectionName = updatedWall.GroupAConnectionName;
                    _context.GroupConnections.Update(groupAConnection);
                }

                if (!Enumerable.SequenceEqual(groupAConnection.Terms.Select(x => x.TermName).OrderBy(e => e), updatedWall.GroupATerms.OrderBy(e => e)))
                {
                    foreach (var term in groupAConnection.Terms)
                    {
                        _context.Terms.Remove(term);
                    }

                    foreach (var newTerm in updatedWall.GroupATerms)
                    {
                        _context.Terms.Add(new Term()
                        {
                            TermID = Guid.NewGuid(),
                            TermName = newTerm,
                            GroupConnection = groupAConnection
                        });
                    }
                }

                var groupBConnection = await _context.GroupConnections
                    .Include(x => x.Terms)
                    .Where(x => x.WallID == new Guid(updatedWall.WallID) && x.ConnectionGroup == 'B')
                    .FirstOrDefaultAsync()
                    ;

                if (groupBConnection.ConnectionName != updatedWall.GroupBConnectionName)
                {
                    groupBConnection.ConnectionName = updatedWall.GroupAConnectionName;
                    _context.GroupConnections.Update(groupBConnection);
                }

                if (!Enumerable.SequenceEqual(groupBConnection.Terms.Select(x => x.TermName).OrderBy(e => e), updatedWall.GroupBTerms.OrderBy(e => e)))
                {
                    foreach (var term in groupBConnection.Terms)
                    {
                        _context.Terms.Remove(term);
                    }

                    foreach (var newTerm in updatedWall.GroupBTerms)
                    {
                        _context.Terms.Add(new Term()
                        {
                            TermID = Guid.NewGuid(),
                            TermName = newTerm,
                            GroupConnection = groupBConnection
                        });
                    }
                }

                var groupCConnection = await _context.GroupConnections
                    .Include(x => x.Terms)
                    .Where(x => x.WallID == new Guid(updatedWall.WallID) && x.ConnectionGroup == 'C')
                    .FirstOrDefaultAsync()
                    ;

                if (groupCConnection.ConnectionName != updatedWall.GroupCConnectionName)
                {
                    groupCConnection.ConnectionName = updatedWall.GroupCConnectionName;
                    _context.GroupConnections.Update(groupCConnection);
                }

                if (!Enumerable.SequenceEqual(groupCConnection.Terms.Select(x => x.TermName).OrderBy(e => e), updatedWall.GroupCTerms.OrderBy(e => e)))
                {
                    foreach (var term in groupCConnection.Terms)
                    {
                        _context.Terms.Remove(term);
                    }

                    foreach (var newTerm in updatedWall.GroupCTerms)
                    {
                        _context.Terms.Add(new Term()
                        {
                            TermID = Guid.NewGuid(),
                            TermName = newTerm,
                            GroupConnection = groupCConnection
                        });
                    }
                }

                var groupDConnection = await _context.GroupConnections
                    .Include(x => x.Terms)
                    .Where(x => x.WallID == new Guid(updatedWall.WallID) && x.ConnectionGroup == 'D')
                    .FirstOrDefaultAsync()
                    ;

                if (groupDConnection.ConnectionName != updatedWall.GroupDConnectionName)
                {
                    groupDConnection.ConnectionName = updatedWall.GroupDConnectionName;
                    _context.GroupConnections.Update(groupDConnection);
                }

                if (!Enumerable.SequenceEqual(groupDConnection.Terms.Select(x => x.TermName).OrderBy(e => e), updatedWall.GroupDTerms.OrderBy(e => e)))
                {
                    foreach (var term in groupDConnection.Terms)
                    {
                        _context.Terms.Remove(term);
                    }

                    foreach (var newTerm in updatedWall.GroupDTerms)
                    {
                        _context.Terms.Add(new Term()
                        {
                            TermID = Guid.NewGuid(),
                            TermName = newTerm,
                            GroupConnection = groupDConnection
                        });
                    }
                }

                await _context.SaveChangesAsync();
                transaction.Commit();

                return Ok();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Wall>> PostWall(WallInsertRequestModel wallCreateRequest)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var newWall = new Wall()
                {
                    WallID = Guid.NewGuid(),
                    DateCreated = DateTime.Now,
                    UserID = wallCreateRequest.UserId,
                    WallName = wallCreateRequest.WallName
                };

                _context.Walls.Add(newWall);

                #region GroupA

                var groupAConnection = new GroupConnection()
                {
                    ConnectionID = Guid.NewGuid(),
                    ConnectionName = wallCreateRequest.GroupAConnectionName,
                    ConnectionGroup = 'A',
                    WallID = newWall.WallID
                };

                _context.GroupConnections.Add(groupAConnection);

                foreach (var groupATerm in wallCreateRequest.GroupATerms)
                {
                    var term = new Term()
                    {
                        TermID = Guid.NewGuid(),
                        TermName = groupATerm,
                        GroupConnectionID = groupAConnection.ConnectionID
                    };

                    _context.Terms.Add(term);
                }

                #endregion

                #region GroupB

                var groupBConnection = new GroupConnection()
                {
                    ConnectionID = Guid.NewGuid(),
                    ConnectionName = wallCreateRequest.GroupBConnectionName,
                    ConnectionGroup = 'B',
                    WallID = newWall.WallID
                };

                _context.GroupConnections.Add(groupBConnection);

                foreach (var groupBTerm in wallCreateRequest.GroupBTerms)
                {
                    var term = new Term()
                    {
                        TermID = Guid.NewGuid(),
                        TermName = groupBTerm,
                        GroupConnectionID = groupBConnection.ConnectionID
                    };

                    _context.Terms.Add(term);
                }

                #endregion

                #region GroupC

                var groupCConnection = new GroupConnection()
                {
                    ConnectionID = Guid.NewGuid(),
                    ConnectionName = wallCreateRequest.GroupCConnectionName,
                    ConnectionGroup = 'C',
                    WallID = newWall.WallID
                };

                _context.GroupConnections.Add(groupCConnection);

                foreach (var groupCTerm in wallCreateRequest.GroupCTerms)
                {
                    var term = new Term()
                    {
                        TermID = Guid.NewGuid(),
                        TermName = groupCTerm,
                        GroupConnectionID = groupCConnection.ConnectionID
                    };

                    _context.Terms.Add(term);
                }

                #endregion

                #region GroupD

                var groupDConnection = new GroupConnection()
                {
                    ConnectionID = Guid.NewGuid(),
                    ConnectionName = wallCreateRequest.GroupDConnectionName,
                    ConnectionGroup = 'D',
                    WallID = newWall.WallID
                };

                _context.GroupConnections.Add(groupDConnection);

                foreach (var groupDTerm in wallCreateRequest.GroupDTerms)
                {
                    var term = new Term()
                    {
                        TermID = Guid.NewGuid(),
                        TermName = groupDTerm,
                        GroupConnectionID = groupDConnection.ConnectionID
                    };

                    _context.Terms.Add(term);
                }

                #endregion

                await _context.SaveChangesAsync();
                transaction.Commit();

                return newWall;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        // DELETE: api/Wall/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Wall>> DeleteWall(Guid id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var wall = await _context.Walls
                    .Where(x => x.WallID == id)
                    .FirstOrDefaultAsync();

                if (wall == null)
                {
                    return NotFound();
                }

                // Cascade delete
                var wallGroupConnections = await _context.GroupConnections
                    .Include(x => x.Terms)
                    .Where(x => x.WallID == wall.WallID)
                    .ToListAsync();

                foreach (var connection in wallGroupConnections)
                {
                    foreach (var term in connection.Terms)
                    {
                        _context.Terms.Remove(term);
                    }
                    _context.GroupConnections.Remove(connection);
                }

                _context.Walls.Remove(wall);

                await _context.SaveChangesAsync();
                transaction.Commit();

                return wall;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
