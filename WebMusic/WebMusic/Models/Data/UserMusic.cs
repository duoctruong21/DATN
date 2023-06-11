using Microsoft.AspNetCore.Identity;

namespace WebMusic.Models.Data
{
    public class UserMusic
    {
        public bool isActive { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string token { get; set; }
    }
}
