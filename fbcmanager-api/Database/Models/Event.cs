using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 

[Table("Events")]
public class Event {

    public string Description{ get; set; }
    public string Location{ get; set; }
    public string Header{ get; set; }
    public DateOnly Date{ get; set; }
    public TimeOnly From{ get; set; }
    public TimeOnly To{ get; set; }
    public double Price { get; set; }
    public List<User> Participants{ get; set; }

    public string Id { get; set; }
}