namespace WebMusic.Models.Data
{
    public class Songs
    {
        public int Id { get; set; }

        public string? SongName { get; set; }

        public string? SongDescription { get; set; }

        public string? LyricSong { get; set; }

        public int? IdSinger { get; set; }
        public int? IdAlbum { get; set; }
        public IFormFile? FileMp3 { get; set; }
        public IFormFile? FileImg { get; set; }

    }
}
