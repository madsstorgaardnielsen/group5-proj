using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

public class FieldDTO {
    [Required]
    [StringLength(200, MinimumLength = 10)]
    public string FieldName { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 10)]
    public string Location { get; set; }
}

