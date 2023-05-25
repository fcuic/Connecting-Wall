namespace Registration.Models
{
    public class ApplicationUserModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }

        //Admin or regular user
        public string Role { get; set; }
    }
}
