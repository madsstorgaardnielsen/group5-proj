using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

public class BookingDTO {
    public string BookingId { get; set; }
    public string FieldId { get; set; }
    public string TeamId { get; set; }
    public DateTime BookedFrom { get; set; }
    public DateTime BookedTo { get; set; }
}

public class UpdateBookingDTO : BookingDTO {
    [Required] public string BookingId { get; set; }
}

public class CreateBookingDTO  {
    [Required] public string FieldId { get; set; }
    [Required] public string TeamId { get; set; }
    [Required] public DateTime BookedFrom { get; set; }
    [Required] public DateTime BookedTo { get; set; }
}