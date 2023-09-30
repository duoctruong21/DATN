using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbEvaluaTutorial
{
    public int Id { get; set; }

    public int? IdUser { get; set; }

    public int? IdOptionEvalua { get; set; }

    public int? IdContent { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Comment { get; set; } = null!;

    public virtual TbContent? IdContentNavigation { get; set; }

    public virtual TbOptionEvalua? IdOptionEvaluaNavigation { get; set; }

    public virtual TbAccount? IdUserNavigation { get; set; }

    public virtual ICollection<TbRequestComment> TbRequestComments { get; set; } = new List<TbRequestComment>();
}
