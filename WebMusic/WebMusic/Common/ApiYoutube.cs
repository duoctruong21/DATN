using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using System.Text.RegularExpressions;
using YoutubeExplode;
using YoutubeExplode.Videos.Streams;
using NAudio.Wave;

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

       /* static async Task ConvertYouTubeLinkToMp3(string youtubeLink, string outputFilePath)
        {
            try
            {
                var youtube = new YoutubeClient();
                var video = await youtube.Videos.GetAsync(youtubeLink);
                var streamInfo = video.AudioStreams.FirstOrDefault();

                if (streamInfo != null)
                {
                    using (var audioStream = await youtube.Videos.Streams.GetAsync(streamInfo))
                    {
                        using (var mp3FileWriter = new LameMP3FileWriter(outputFilePath, audioStream.Format.SampleRate, audioStream.Format.Channels))
                        {
                            await audioStream.CopyToAsync(mp3FileWriter);
                        }
                    }

                    Console.WriteLine("Chuyển đổi thành công. File MP3 đã được tạo: " + outputFilePath);
                }
                else
                {
                    Console.WriteLine("Không tìm thấy luồng âm thanh.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Đã xảy ra lỗi trong quá trình chuyển đổi: " + ex.Message);
            }
        }*/
    }
}
