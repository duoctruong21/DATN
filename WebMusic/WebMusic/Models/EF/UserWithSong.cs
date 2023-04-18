using System;
using System.Collections.Generic;

namespace WebMusic.models.ef;

public partial class UserWithSong
{
    public string Iduser { get; set; } = null!;

    public int Idsong { get; set; }

    public string? Status { get; set; }

    public virtual Song IdsongNavigation { get; set; } = null!;
}
