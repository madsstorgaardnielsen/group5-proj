using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

//TODO add validation 
public class FieldDTO : IDTO {
    public string Id { get; set; }
    public string FieldName { get; set; }
    public string Location { get; set; }
}

public class UpdateFieldDTO : IDTO {
    [Required] public string Id { get; set; }
    [Required] public string FieldName { get; set; }
    [Required] public string Location { get; set; }
}

public class CreateFieldDTO {
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string FieldName { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Location { get; set; }
}

