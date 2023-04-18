using System;
using System.Collections.Generic;

namespace WebMusic.models.ef;

public partial class Topic
{
    public int Id { get; set; }

    public string? TopicName { get; set; }

    public string? TopicDescription { get; set; }

    public string? TopicImg { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual ICollection<Category> IdCategories { get; set; } = new List<Category>();

    public IFormFile? FileImg { get; set; }

}
