using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

//TODO add validation 
public class EventDTO : IDTO {
    public string Id { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Header { get; set; }
    [DataType(DataType.Date)]public DateTime From { get; set; }
    [DataType(DataType.Date)]public DateTime To { get; set; }
    public double Price { get; set; }
    public List<ParticipantUserDTO> Participants { get; set; }
}

public class UpdateEventDTO : IDTO {
    [Required] public string Id { get; set; }
    [Required] public string Description { get; set; }
    [Required] public string Location { get; set; }
    [Required] public string Header { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime From { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime To { get; set; }
    [Required] public double Price { get; set; }
}

public class CreateEventDTO {
    [Required] public string Description { get; set; }
    [Required] public string Location { get; set; }
    [Required] public string Header { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime From { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime To { get; set; }
    [Required] public double Price { get; set; }
}