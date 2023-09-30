using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbTutorial
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Img { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public int? IdCategory { get; set; }

    public virtual TbCategory? IdCategoryNavigation { get; set; }

    public virtual ICollection<TbContent> TbContents { get; set; } = new List<TbContent>();
}
