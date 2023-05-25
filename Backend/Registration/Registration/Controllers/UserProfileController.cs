using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Registration.Models;

namespace Registration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private AuthenticationContext _app;
        private readonly APIDBContext _context;

        public UserProfileController(UserManager<ApplicationUser> userManager, AuthenticationContext application, APIDBContext context)
        {
            _userManager = userManager;
            _app = application;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FullName,
                user.Email,
                user.UserName,
                user.Id
            };
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<Object> GetAllUsers()
        {
            var users = await _userManager.GetUsersInRoleAsync("User");
            return users;
        }

        [HttpDelete("DeleteUserProfile/{id}")]
        public async Task<IActionResult> DeleteUserProfile(string id)
        {
            var user = await _app.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            _app.Users.Remove(user);
            await _app.SaveChangesAsync();
            return Ok();
        }
    }
}