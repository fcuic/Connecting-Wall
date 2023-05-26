using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registration.Models;

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

            //var groupAConnections = _context.GroupConnections
            //    .Where(x => x.wallID1 == );

            //return await _context.Walls
            //    .Include(p => p.User)
            //    .Include(p => p.groupATerms)
            //    .Include(p => p.groupBTerms)
            //    .Include(p => p.groupCTerms)
            //    .Include(p => p.groupDTerms)
            //    .Include(p => p.groupAConnections)
            //    .Include(p => p.groupBConnections)
            //    .Include(p => p.groupCConnections)
            //    .Include(p => p.groupDConnections)
            //    .ToListAsync();

            return (await walls.ToListAsync());
        }

        [HttpGet("GetWallsByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Wall>>> GetWallsByUserId(string userId)
        {
            return await _context.Walls
                .Where(w => w.UserID == userId)
                .Include(p => p.User)
                //.Include(p => p.groupATerms)
                //.Include(p => p.groupBTerms)
                //.Include(p => p.groupCTerms)
                //.Include(p => p.groupDTerms)
                //.Include(p => p.groupAConnections)
                //.Include(p => p.groupBConnections)
                //.Include(p => p.groupCConnections)
                //.Include(p => p.groupDConnections)
                .ToListAsync();
        }

        // GET: api/Wall/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wall>> GetWall(Guid id)
        {
            try
            {
                var wall = await _context.Walls
                    .Include(p => p.User)
                    //.Include(p => p.groupATerms)
                    //.Include(p => p.groupBTerms)
                    //.Include(p => p.groupCTerms)
                    //.Include(p => p.groupDTerms)
                    //.Include(p => p.groupAConnections)
                    //.Include(p => p.groupBConnections)
                    //.Include(p => p.groupCConnections)
                    //.Include(p => p.groupDConnections)
                    .Where(x => x.WallID == id)
                    .FirstOrDefaultAsync();

                if (wall == null)
                {
                    return NotFound();
                }

                // Fill-in the group connections and terms
                //wall.groupAConnections = await _context.GroupConnections
                //    .Where(x => x.wallID == wall.wallID)
                //    .ToListAsync();

                //wall.groupBConnections = await _context.GroupConnections
                //    .Where(x => x.wallID1 == wall.wallID)
                //    .ToListAsync();

                //wall.groupCConnections = await _context.GroupConnections
                //    .Where(x => x.wallID2 == wall.wallID)
                //    .ToListAsync();

                //wall.groupDConnections = await _context.GroupConnections
                //    .Where(x => x.wallID3 == wall.wallID)
                //    .ToListAsync();

                //wall.groupATerms = await _context.Terms
                //    .Where(x => x.wallID == wall.wallID)
                //    .ToListAsync();

                //wall.groupBTerms = await _context.Terms
                //    .Where(x => x.wallID1 == wall.wallID)
                //    .ToListAsync();

                //wall.groupCTerms = await _context.Terms
                //    .Where(x => x.wallID2 == wall.wallID)
                //    .ToListAsync();

                //wall.groupDTerms = await _context.Terms
                //    .Where(x => x.wallID3 == wall.wallID)
                //    .ToListAsync();

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
        public async Task<ActionResult<Wall>> PostWall(Wall wall)
        {
            _context.Walls.Add(wall);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWall", new { id = wall.WallID }, wall);
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
