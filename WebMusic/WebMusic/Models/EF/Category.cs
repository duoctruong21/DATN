using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class Category
{
    public int Id { get; set; }

    public string? CategoryName { get; set; }

    public string? CategoryDescription { get; set; }

    public string? CategoryImg { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual ICollection<Album> IdAlbums { get; set; } = new List<Album>();

    public virtual ICollection<Topic> IdTopics { get; set; } = new List<Topic>();
}
