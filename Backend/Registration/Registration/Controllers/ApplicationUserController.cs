using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Registration.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Registration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<Models.ApplicationUser> _userManager;
        private SignInManager<Models.ApplicationUser> _signinManager;
        private readonly ApplicationSettings _appSettings;

        public ApplicationUserController(UserManager<Models.ApplicationUser> userManager, SignInManager<Models.ApplicationUser> signinManager,IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signinManager = signinManager;
            _appSettings = appSettings.Value;
        }
        [HttpPost]
        [Route("Register")]
        //Post: api/ApplicationUser/Register

        public async Task<Object> PostApplicationUser(Models.ApplicationUserModel model) 
        {
            model.Role = "User";
            var applicationUser = new Models.ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email,
                FullName = model.FullName
            };

            try
            {
                var result =await  _userManager.CreateAsync(applicationUser, model.Password);
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        //client authentication
        [HttpPost]
        [Route("Login")]
        //Post: api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model) 
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //role assigned to user
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim ("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),//token expiring in 1 day
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)//hardcoded
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token});
            }
            else 
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }
    }
}