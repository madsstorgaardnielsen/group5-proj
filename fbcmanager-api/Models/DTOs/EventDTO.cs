using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class EventDTO {
    [Required] public string Id { get; set; }
    [Required] public string Description { get; set; }
    [Required] public string Location { get; set; }
    [Required] public string Header { get; set; }
    [Required] public DateTime From{ get; set; }
    [Required] public DateTime To{ get; set; }
    [Required] public double Price { get; set; }
}

public class UpdateEventDTO : EventDTO {
}