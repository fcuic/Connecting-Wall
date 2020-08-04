using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
//using System.Web.Http;
//using System.Web.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Registration.Models;
using System.Net.Http;

namespace Registration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private UserManager<Models.ApplicationUser> _userManager;
        private AuthenticationContext _app;
        private readonly APIDBContext _context;
        public UserProfileController(UserManager<Models.ApplicationUser> userManager, AuthenticationContext application,APIDBContext context)
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
        [HttpDelete("DeleteUserProfile/{id}")]//deleting user by id
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