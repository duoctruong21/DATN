using Microsoft.AspNetCore.Identity;

namespace WebMusic.Models.Data
{
    public class UserMusic
    {
        public bool? isActive { get; set; }
        public string? first { get; set; }
        public string? last { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public string? token { get; set; }
        public int? id { get; set; }
    }
}
