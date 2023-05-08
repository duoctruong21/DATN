using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class UserRole
{
    public string UserId { get; set; } = null!;

    public string RoleId { get; set; } = null!;
}
