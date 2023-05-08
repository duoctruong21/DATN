namespace WebMusic.Models.Data
{
    public class Singers
    {
        public int Id { get; set; }

        public string? SingerName { get; set; }

        public string? SingerDescription { get; set; }

        public string? SingerInfomation { get; set; }

        public IFormFile? FileImg { get; set; }
    }
}
