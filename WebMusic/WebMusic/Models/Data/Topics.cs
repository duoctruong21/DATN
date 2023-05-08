namespace WebMusic.Models.Data
{
    public class Topics
    {
        public int Id { get; set; }

        public string? TopicName { get; set; }

        public string? TopicDescription { get; set; }

        public IFormFile? FileImg { get; set; }
    }
}
