using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class CategoryWithSong
{
    public int Id { get; set; }

    public int? Idcategory { get; set; }

    public int? Idsong { get; set; }

    public virtual Category? IdcategoryNavigation { get; set; }

    public virtual Song? IdsongNavigation { get; set; }
}
