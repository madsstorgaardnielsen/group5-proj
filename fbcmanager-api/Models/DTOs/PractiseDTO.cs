using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

public class PractiseDTO {
    [Required] public Team Team { get; set; }
    [Required] public Field Location { get; set; }
    [Required] public DateOnly Date { get; set; }
    [Required] public TimeOnly From { get; set; }
    [Required] public TimeOnly To { get; set; }
}