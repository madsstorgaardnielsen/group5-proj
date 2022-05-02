using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models;

public class Booking {
    public string BookingId { get; set; }
    public Field Field { get; set; }
    public Team Team { get; set; }
    public DateTime BookedFrom { get; set; }
    public DateTime BookedTo { get; set; }
}