using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbRoleAccount
{
    public int IdUser { get; set; }

    public int IdRole { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual TbRole IdRoleNavigation { get; set; } = null!;

    public virtual TbAccount IdUserNavigation { get; set; } = null!;
}
