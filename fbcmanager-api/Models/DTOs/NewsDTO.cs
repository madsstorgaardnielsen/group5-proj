using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

//TODO add validation 
public class NewsDTO : IDTO {
    public string Id { get; set; }
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

public class UpdateNewsDTO : IDTO {
    [Required] public string Id { get; set; }
    [Required] public DateTime Date { get; set; }
    [Required] public string Header { get; set; }
    [Required] public string Subheader { get; set; }
    [Required] public string Content { get; set; }
}