namespace WebMusic.Models.Data
{
    public class Albums
    {
        public int Id { get; set; }

        public string? AlbumName { get; set; }

        public string? AlbumDescription { get; set; }

        public IFormFile? FileImg { get; set; }

        public int? iduser { get; set;}
        public int? idSong { get; set;}
    }
}
