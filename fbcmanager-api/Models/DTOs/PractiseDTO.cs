using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

public class PractiseDTO {
    public string PractiseId { get; set; }
    public string TeamId { get; set; }
    public string FieldId { get; set; }
    public DateTime Date { get; set; }
    public List<UserDTO> Participants { get; set; }
}

public class CreatePractiseDTO : PractiseDTO {
    [Required] public string TeamId { get; set; }
    [Required] public string FieldId { get; set; }
    [Required] public DateTime Date { get; set; }
}

public class UpdatePractiseDTO : PractiseDTO {
    [Required] public string PractiseId { get; set; }
}