namespace WebMusic.Models.Data
{
    public class SingerInfo
    {
        public string? songName { get; set; }
        public string? singerName { get; set; }
        public string? albumName { get; set; }
        public string? fileImg { get; set; }
        public string? fileImgSinger { get; set; }
        public string? descriptions { get; set; }

        public string? linksong { get; set; }
        public string? linksinger { get; set; }
        public string? linkalbum { get; set; }
        public int? idSong { get; set; }
        public int? idSinger { get; set; }
        public int? idAlbum { get; set; }
        public string? mp3 { get; set; }
    }
}
