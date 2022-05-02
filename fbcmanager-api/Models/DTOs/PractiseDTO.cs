using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

public class PractiseDTO {
    public string PractiseId { get; set; } 
    [Required] public Team Team { get; set; }
    [Required] public Field Location { get; set; }
    [Required] public DateTime Date { get; set; }

}