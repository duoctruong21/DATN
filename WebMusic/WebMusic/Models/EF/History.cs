using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class History
{
    public int Id { get; set; }

    public int? Iduser { get; set; }

    public int? Idsong { get; set; }

    public int? Countlisten { get; set; }

    public bool? Listened { get; set; }

    public DateTime? Listendate { get; set; }

    public virtual Song? IdsongNavigation { get; set; }

    public virtual UserWebMusic? IduserNavigation { get; set; }
}
