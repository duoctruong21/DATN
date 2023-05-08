using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class UserWithSong
{
    public string Iduser { get; set; } = null!;

    public int Idsong { get; set; }

    public string? Status { get; set; }

    public virtual Song IdsongNavigation { get; set; } = null!;
}
