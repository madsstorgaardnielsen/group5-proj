using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class EventDTO {
    [Required] public string Description { get; set; }
    [Required] public string Location { get; set; }
    [Required] public string Header { get; set; }
    [Required] public DateOnly Date { get; set; }
    [Required] public TimeOnly From { get; set; }
    [Required] public TimeOnly To { get; set; }
    [Required] public double Price { get; set; }
}

public class UpdateEventDTO : EventDTO {
}