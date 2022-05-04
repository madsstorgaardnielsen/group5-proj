using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class EventDTO {
    public string EventId { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Header { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public double Price { get; set; }
    public List<UserDTO> Participants { get; set; }
}

public class UpdateEventDTO : EventDTO {
    [Required] public string EventId { get; set; }
}

public class CreateEventDTO  {
    [Required] public string Description { get; set; }
    [Required] public string Location { get; set; }
    [Required] public string Header { get; set; }
    [Required] public DateTime From { get; set; }
    [Required] public DateTime To { get; set; }
    [Required] public double Price { get; set; }
}