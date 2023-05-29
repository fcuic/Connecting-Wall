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

        // PUT: api/Wall/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWall(Guid id, Wall wall)
        {
            if (id != wall.WallID)
            {
                return BadRequest();
            }

            _context.Entry(wall).State = EntityState.Modified;
            //MODIFYING entities inside child entities of wall
            //foreach (Term term in wall.groupATerms)
            //{
            //    _context.Entry(term).State = term.TermID == null ? EntityState.Added : EntityState.Modified;
            //}
            //foreach (Term term in wall.groupBTerms)
            //{
            //    _context.Entry(term).State = term.TermID == null ? EntityState.Added : EntityState.Modified;
            //}
            //foreach (Term term in wall.groupCTerms)
            //{
            //    _context.Entry(term).State = term.TermID == null ? EntityState.Added : EntityState.Modified;
            //}
            //foreach (Term term in wall.groupDTerms)
            //{
            //    _context.Entry(term).State = term.TermID == null ? EntityState.Added : EntityState.Modified;
            //}
            //foreach (GroupConnection gc in wall.groupAConnections)
            //{
            //    _context.Entry(gc).State = gc.ConnectionId == null ? EntityState.Added : EntityState.Modified;
            //}
            //foreach (GroupConnection gc in wall.groupBConnections)
            //{
            //    _context.Entry(gc).State = gc.ConnectionId == null ? EntityState.Added : EntityState.Modified;
            //}
            //foreach (GroupConnection gc in wall.groupCConnections)
            //{
            //    _context.Entry(gc).State = gc.ConnectionId == null ? EntityState.Added : EntityState.Modified;
            //}
            //foreach (GroupConnection gc in wall.groupDConnections)
            //{
            //    _context.Entry(gc).State = gc.ConnectionId == null ? EntityState.Added : EntityState.Modified;
            //}

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WallExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(_context.Walls.Find(id));
        }

        // POST: api/Wall
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
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
            var wall = await _context.Walls.FindAsync(id);
            if (wall == null)
            {
                return NotFound();
            }

            _context.Walls.Remove(wall);
            await _context.SaveChangesAsync();

            return wall;
        }

        private bool WallExists(Guid id)
        {
            return _context.Walls.Any(e => e.WallID == id);
        }
    }
}
