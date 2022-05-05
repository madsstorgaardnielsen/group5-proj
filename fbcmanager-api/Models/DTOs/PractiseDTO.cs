using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

//TODO add validation 
public class PractiseDTO : IDTO {
    public string Id { get; set; }
    public string TeamId { get; set; }
    public string FieldId { get; set; }
    [DataType(DataType.Date)] public DateTime Date { get; set; }
    public List<ParticipantUserDTO> Participants { get; set; }
}

public class CreatePractiseDTO {
    [Required] public string TeamId { get; set; }
    [Required] public string FieldId { get; set; }
    [Required] [DataType(DataType.Date)] public DateTime Date { get; set; }
}

public class UpdatePractiseDTO : IDTO {
    [Required] public string Id { get; set; }
    [Required] public string TeamId { get; set; }
    [Required] public string FieldId { get; set; }
    [Required] [DataType(DataType.Date)] public DateTime Date { get; set; }
}