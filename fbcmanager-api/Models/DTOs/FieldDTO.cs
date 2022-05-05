using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class FieldDTO {
    public string FieldId { get; set; }
    public string FieldName { get; set; }
    public string Location { get; set; }
}

public class CreateFieldDTO {
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string FieldName { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Location { get; set; }
}

public class UpdateFieldDTO : FieldDTO {
    [Required] public string FieldId { get; set; }
}

