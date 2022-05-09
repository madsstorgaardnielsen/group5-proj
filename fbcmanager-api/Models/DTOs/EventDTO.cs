using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class EventDTO : IDTO {
    public string Id { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Header { get; set; }
    [DataType(DataType.Date)] public DateTime From { get; set; }
    [DataType(DataType.Date)] public DateTime To { get; set; }
    public double Price { get; set; }
    public List<ParticipantUserDTO> Participants { get; set; }
}

public class UpdateEventDTO : IDTO {
    [Required] public string Id { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Description { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Location { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Header { get; set; }

    [Required] [DataType(DataType.Date)] public DateTime From { get; set; }
    [Required] [DataType(DataType.Date)] public DateTime To { get; set; }
    [Required] public double Price { get; set; }
}

public class CreateEventDTO {
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Description { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Location { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Header { get; set; }

    [Required] [DataType(DataType.Date)] public DateTime From { get; set; }
    [Required] [DataType(DataType.Date)] public DateTime To { get; set; }
    [Required] public double Price { get; set; }
}