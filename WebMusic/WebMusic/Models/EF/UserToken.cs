﻿using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class UserToken
{
    public string UserId { get; set; } = null!;

    public string LoginProvider { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Value { get; set; }
}
