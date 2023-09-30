using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbRequestComment
{
    public int Id { get; set; }

    public int? IdUserComment { get; set; }

    public int? IdUserResponse { get; set; }

    public int? IdOptionEvalua { get; set; }

    public int? IdEvaluaTutorial { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Comment { get; set; }

    public virtual TbEvaluaTutorial? IdEvaluaTutorialNavigation { get; set; }

    public virtual TbOptionEvalua? IdOptionEvaluaNavigation { get; set; }

    public virtual TbAccount? IdUserCommentNavigation { get; set; }

    public virtual TbAccount? IdUserResponseNavigation { get; set; }
}
