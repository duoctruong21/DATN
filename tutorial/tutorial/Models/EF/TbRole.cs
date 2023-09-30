using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbRole
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<TbRoleAccount> TbRoleAccounts { get; set; } = new List<TbRoleAccount>();
}
