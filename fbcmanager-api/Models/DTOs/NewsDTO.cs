using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class NewsDTO : IDTO {
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string Header { get; set; }
    public string Subheader { get; set; }
    public string Content { get; set; }
}

public class CreateNewsDTO {
    [Required] public DateTime Date { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Header { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Subheader { get; set; }

    [Required] public string Content { get; set; }
}

public class UpdateNewsDTO : IDTO {
    [Required] public string Id { get; set; }
    [Required] public DateTime Date { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Header { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Subheader { get; set; }

    [Required] public string Content { get; set; }
}