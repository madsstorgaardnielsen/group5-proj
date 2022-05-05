using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models;

public class Booking : IEntity {
    // public string BookingId { get; set; }
    public string Id { get; set; }
    public Field Field { get; set; }
    public Team Team { get; set; }
    public string FieldId { get; set; }
    public string TeamId { get; set; }
    public DateTime BookedFrom { get; set; }
    public DateTime BookedTo { get; set; }
}