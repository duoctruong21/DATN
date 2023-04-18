using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using FirebaseAdmin.Auth;
using Firebase.Auth.Providers;
using Firebase.Storage;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Firebase.Database;
using Firebase.Auth;
using System.IO;

namespace WebMusic.Common
{
    public class UploadFile
    {
        private readonly FirebaseStorage _firebaseStorage;

        public UploadFile(string name)
        {
            _firebaseStorage = new FirebaseStorage(name);
        }

        public static async Task Uploadfile(IFormFile img)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", img.FileName);
            using (var stream = System.IO.File.OpenWrite(path))
            {
                await img.CopyToAsync(stream);
            }
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", file.FileName);
            // Tạo stream từ dữ liệu ảnh
            using var stream = System.IO.File.Create(path);
            await file.CopyToAsync(stream);
            stream.Close();
            using var streams = System.IO.File.Open(path, FileMode.Open, FileAccess.ReadWrite);

            // Tạo tên file
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            // Tạo đường dẫn lưu trữ trên Firebase
            var storagePath = $"images/{fileName}";

            // Upload ảnh lên Firebase
            var uploadTask = _firebaseStorage.Child(storagePath).PutAsync(streams);
            var downloadUrl = await uploadTask;

            // Lấy đường dẫn download của ảnh
            var imageUrl = downloadUrl;
            return imageUrl;
        }

    }
}
