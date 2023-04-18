using Firebase.Storage;
using FirebaseAdmin.Auth;

namespace WebMusic.Common
{
    public class ConnectFirebase
    {
        private readonly FirebaseStorage _firebaseStorage;

        public ConnectFirebase(string bucketName)
        {
            _firebaseStorage = new FirebaseStorage(bucketName);
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", file.FileName);
            // Tạo stream từ dữ liệu ảnh
            using var stream = System.IO.File.Create(path);
            await file.CopyToAsync(stream);

            // Tạo tên file
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            // Tạo đường dẫn lưu trữ trên Firebase
            var storagePath = $"images/{fileName}";

            // Upload ảnh lên Firebase
            var uploadTask = _firebaseStorage.Child(storagePath).PutAsync(stream);
            var downloadUrl = await uploadTask;

            // Lấy đường dẫn download của ảnh
            var imageUrl = downloadUrl;
            return imageUrl;
        }
    }
}
