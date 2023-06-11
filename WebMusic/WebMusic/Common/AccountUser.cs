using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebMusic.Models.Data;
using WebMusic.Models.EF;
using System.Security.Cryptography;

namespace WebMusic.Common
{
    public class AccountUser
    {
        public string HashPassword(string password)
        {
            using (var sha256 = new SHA256Managed())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hashBytes = sha256.ComputeHash(bytes);
                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return hash;
            }
        }
        public bool VerifyPassword(string password, string hashedPassword)
        {
            var hashedPasswordToVerify = HashPassword(password);
            return hashedPasswordToVerify == hashedPassword;
        }

    }
}
