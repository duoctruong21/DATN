using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime? CreatedDate { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public string? Img { get; set; }

    public string? Alias { get; set; }

    public virtual ICollection<TbTutorial> TbTutorials { get; set; } = new List<TbTutorial>();
}
