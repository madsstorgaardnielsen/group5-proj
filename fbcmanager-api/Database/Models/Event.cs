using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 

[Table("Events")]
public class Event {

    public string Description{ get; set; }
    public string Location{ get; set; }
    public string Header{ get; set; }
    public DateTime From{ get; set; }
    public DateTime To{ get; set; }
    public double Price { get; set; }
    public List<User> Participants{ get; set; } = new();

    public string EventId { get; set; }
}

