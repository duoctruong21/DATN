using System;
using System.Collections.Generic;

namespace WebMusic.Models.EF;

public partial class UserWebMusic
{
    public int Id { get; set; }

    public string? Gmail { get; set; }

    public string? Password { get; set; }

    public bool? IsActive { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? LinkAvatar { get; set; }
}
