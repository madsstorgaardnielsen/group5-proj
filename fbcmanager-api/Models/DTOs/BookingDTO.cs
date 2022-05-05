using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

//TODO add validation 
public class BookingDTO : IDTO {
    public string Id { get; set; }
    public string TeamId { get; set; }
    public string FieldId { get; set; }
    [DataType(DataType.Date)]public DateTime BookedFrom { get; set; }
    [DataType(DataType.Date)]public DateTime BookedTo { get; set; }
}

public class UpdateBookingDTO : IDTO {
    [Required] public string Id { get; set; }
    [Required] public string FieldId { get; set; }
    [Required] public string TeamId { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime BookedFrom { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime BookedTo { get; set; }
}

public class CreateBookingDTO {
    [Required] public string FieldId { get; set; }
    [Required] public string TeamId { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime BookedFrom { get; set; }
    [Required] [DataType(DataType.Date)]public DateTime BookedTo { get; set; }
}