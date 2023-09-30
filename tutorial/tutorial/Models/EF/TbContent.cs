using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbContent
{
    public int Id { get; set; }

    public string? Content { get; set; }

    public int? IdTutorial { get; set; }

    public int? IdUser { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual TbTutorial? IdTutorialNavigation { get; set; }

    public virtual TbAccount? IdUserNavigation { get; set; }

    public virtual ICollection<TbEvaluaTutorial> TbEvaluaTutorials { get; set; } = new List<TbEvaluaTutorial>();

    public virtual ICollection<TbOptionTutorial> TbOptionTutorials { get; set; } = new List<TbOptionTutorial>();
}
