using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<IEnumerable<Wall>>> GetWalls()
        {
            /*var result = await _context.Walls
                .Include(p => p.User)
                .Select(usr => new WallViewModel()
                {
                    UserName = usr.User.UserName,
                    Email=usr.User.Email,
                    FullName=usr.User.FullName
                }).ToListAsync();*/
            return await _context.Walls //kad se sve dohvaca
                .Include(p=>p.User)
                .Include(p=>p.groupATerms)
                .Include(p=>p.groupBTerms)
                .Include(p => p.groupCTerms)
                .Include(p => p.groupDTerms)
                .Include(p => p.groupAConnections)
                .Include(p=>p.groupBConnections)
                .Include(p => p.groupCConnections)
                .Include(p => p.groupDConnections)
                .ToListAsync();
           
        }
        [HttpGet("GetWallsByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Wall>>> GetWallsByUserId(string userId) 
        {
            return await _context.Walls
                .Where(w => w.userID == userId)
                .Include(p=>p.User)
                .Include(p => p.groupATerms)
                .Include(p => p.groupBTerms)
                .Include(p => p.groupCTerms)
                .Include(p => p.groupDTerms)
                .Include(p => p.groupAConnections)
                .Include(p => p.groupBConnections)
                .Include(p => p.groupCConnections)
                .Include(p => p.groupDConnections)
                .ToListAsync();
        }

        // GET: api/Wall/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wall>> GetWall(Guid id)
        {
            var wall = await _context.Walls
                .Include(p => p.User)
                .Include(p => p.groupATerms)
                .Include(p => p.groupBTerms)
                .Include(p => p.groupCTerms)
                .Include(p => p.groupDTerms)
                .Include(p => p.groupAConnections)
                .Include(p => p.groupBConnections)
                .Include(p => p.groupCConnections)
                .Include(p => p.groupDConnections)
                .FirstOrDefaultAsync(i => i.wallID == id);//bolje nego findbyid

            if (wall == null)
            {
                return NotFound();
            }

            return wall;
        }

        // PUT: api/Wall/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWall(Guid id, Wall wall)
        {
            if (id != wall.wallID)
            {
                return BadRequest();
            }

            _context.Entry(wall).State = EntityState.Modified;

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

            return NoContent();
        }

        // POST: api/Wall
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Wall>> PostWall(Wall wall)
        {
            _context.Walls.Add(wall);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWall", new { id = wall.wallID }, wall);
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
            return _context.Walls.Any(e => e.wallID == id);
        }
    }
}
