using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class Topicwithsong
{
    public int Id { get; set; }

    public int? Idtopic { get; set; }

    public int? Idsong { get; set; }

    public virtual Song? IdsongNavigation { get; set; }

    public virtual Topic? IdtopicNavigation { get; set; }
}
