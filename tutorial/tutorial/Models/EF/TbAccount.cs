using System;
using System.Collections.Generic;

namespace tutorial.Models.EF;

public partial class TbAccount
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime? CreatedDate { get; set; }

    public string FullName { get; set; } = null!;

    public string? Img { get; set; }

    public string? Address { get; set; }

    public bool? IsActive { get; set; }

    public string? Token { get; set; }

    public virtual ICollection<TbContent> TbContents { get; set; } = new List<TbContent>();

    public virtual ICollection<TbEvaluaTutorial> TbEvaluaTutorials { get; set; } = new List<TbEvaluaTutorial>();

    public virtual ICollection<TbOptionTutorial> TbOptionTutorials { get; set; } = new List<TbOptionTutorial>();

    public virtual ICollection<TbRequestComment> TbRequestCommentIdUserCommentNavigations { get; set; } = new List<TbRequestComment>();

    public virtual ICollection<TbRequestComment> TbRequestCommentIdUserResponseNavigations { get; set; } = new List<TbRequestComment>();

    public virtual ICollection<TbRoleAccount> TbRoleAccounts { get; set; } = new List<TbRoleAccount>();
}
