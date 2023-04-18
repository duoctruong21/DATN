using System;
using System.Collections.Generic;

namespace WebMusic.models.ef;

public partial class Singer
{
    public int Id { get; set; }

    public string? SingerName { get; set; }

    public string? SingerDescription { get; set; }

    public string? SingerInfomation { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public string? Fileimg { get; set; }

    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();

    public IFormFile? FileImgs { get; set; }

}
