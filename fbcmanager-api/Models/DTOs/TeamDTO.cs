using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class TeamDTO {
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string TeamName { get; set; }
}