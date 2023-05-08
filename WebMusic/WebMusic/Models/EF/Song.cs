using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class Song
{
    public int Id { get; set; }

    public string? SongName { get; set; }

    public int? ViewCount { get; set; }

    public int? ListenCount { get; set; }

    public int? LikeCount { get; set; }

    public string? SongDescription { get; set; }

    public string? LyricSong { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public int? IdSinger { get; set; }

    public string? Filesong { get; set; }

    public string? Fileimg { get; set; }

    public int? IdAlbum { get; set; }

    public string? Alias { get; set; }

    public virtual Album? IdAlbumNavigation { get; set; }

    public virtual Singer? IdSingerNavigation { get; set; }

    public virtual ICollection<UserWithSong> UserWithSongs { get; set; } = new List<UserWithSong>();

    public virtual ICollection<Album> IdAlbums { get; set; } = new List<Album>();
}
