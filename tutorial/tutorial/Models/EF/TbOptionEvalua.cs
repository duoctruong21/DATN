using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbOptionEvalua
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<TbEvaluaTutorial> TbEvaluaTutorials { get; set; } = new List<TbEvaluaTutorial>();

    public virtual ICollection<TbOptionTutorial> TbOptionTutorials { get; set; } = new List<TbOptionTutorial>();

    public virtual ICollection<TbRequestComment> TbRequestComments { get; set; } = new List<TbRequestComment>();
}
