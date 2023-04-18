using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using FirebaseAdmin.Auth;
using Firebase.Auth.Providers;
using Firebase.Storage;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Firebase.Database;
using Firebase.Auth;

namespace WebMusic.Common
{
    public static class UploadFile
    {
        
        public static async Task Uploadfile(IFormFile img)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", img.FileName);
            using (var stream = System.IO.File.OpenWrite(path))
            {
                await img.CopyToAsync(stream);
            }
        }

    }
}
