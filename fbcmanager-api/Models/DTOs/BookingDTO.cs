using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

public class BookingDTO {
    [Required] public Field Field { get; set; }
    [Required] public Team Team { get; set; }
    [Required] public DateTime BookedFrom { get; set; }
    [Required] public DateTime BookedTo { get; set; }
}