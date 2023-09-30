using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbOptionTutorial
{
    public int IdUser { get; set; }

    public int IdContent { get; set; }

    public int? IdOptionEvalua { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual TbContent IdContentNavigation { get; set; } = null!;

    public virtual TbOptionEvalua? IdOptionEvaluaNavigation { get; set; }

    public virtual TbAccount IdUserNavigation { get; set; } = null!;
}
