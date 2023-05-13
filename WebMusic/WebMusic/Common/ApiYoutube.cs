/*using Google.Apis.Services;
using Google.Apis.YouTube.v3;
namespace WebMusic.Common
{
    public class ApiYoutube
    {
        
// Tạo đối tượng YouTubeService với khóa API của bạn.
YouTubeService youtubeService = new YouTubeService(new BaseClientService.Initializer()
{
    ApiKey = "AIzaSyCmOA8IN7xsLRBA2fci_NvNEbWMDKwCjlo",
    ApplicationName = "YOUR_APPLICATION_NAME_HERE"
});

// Gọi API YouTube để lấy thông tin video theo ID.
var videoRequest = youtubeService.Videos.List("snippet");
    videoRequest.Id = "VIDEO_ID_HERE";
var videoResponse = videoRequest.Execute();

    // In ra tiêu đề của video.
    Console.WriteLine(videoResponse.Items[0].Snippet.Title);
    }
}
*/