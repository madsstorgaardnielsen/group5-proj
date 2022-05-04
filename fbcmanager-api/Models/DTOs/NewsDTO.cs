using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class NewsDTO {
    public string NewsId { get; set; }
    public DateTime Date { get; set; }
    public string Header { get; set; }
    public string Subheader { get; set; }
    public string Content { get; set; }
}

public class CreateNewsDTO {
    [Required] public DateTime Date { get; set; }
    [Required] public string Header { get; set; }
    [Required] public string Subheader { get; set; }
    [Required] public string Content { get; set; }
}

public class UpdateNewsDTO : NewsDTO {
    [Required] public string NewsId { get; set; }
}