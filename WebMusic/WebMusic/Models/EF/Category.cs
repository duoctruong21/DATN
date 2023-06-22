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

    public string? Alias { get; set; }

    public virtual ICollection<CategoryWithSong> CategoryWithSongs { get; set; } = new List<CategoryWithSong>();

    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();

    public virtual ICollection<Album> IdAlbums { get; set; } = new List<Album>();
}
