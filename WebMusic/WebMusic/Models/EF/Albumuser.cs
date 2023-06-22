using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class Albumuser
{
    public int Id { get; set; }

    public int? Idalbum { get; set; }

    public int? Idsong { get; set; }

    public int? Idcategory { get; set; }

    public virtual Album? IdalbumNavigation { get; set; }

    public virtual Song? IdsongNavigation { get; set; }
}
