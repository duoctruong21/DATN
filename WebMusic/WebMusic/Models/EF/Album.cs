using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class Album
{
    public int Id { get; set; }

    public string? AlbumName { get; set; }

    public string? AlbumDescription { get; set; }

    public string? AlbumImg { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Alias { get; set; }

    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();

    public virtual ICollection<Category> IdCategories { get; set; } = new List<Category>();

    public virtual ICollection<Song> IdSongs { get; set; } = new List<Song>();
}
