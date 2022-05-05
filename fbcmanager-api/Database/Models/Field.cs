using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 
public class Field : IEntity {

    public string FieldName{ get; set; }
    public string Location{ get; set; }
    public List<Booking> Bookings { get; set; }
    // public bool IsBooked{ get; set; }
    // public DateTime BookedFrom{ get; set; }
    // public DateTime BookedTo{ get; set; }
    // public Team BookedBy{ get; set; }

    // public string FieldId { get; set; }
    public string Id { get; set; }
}