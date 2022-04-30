using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 

[Table("Teams")]
public class Team  {
    
    public string Id { get; set; }
    public string TeamName{ get; set; }
    public List<User> TeamMembers { get; set; } = new();
    public List<Booking> Bookings { get; set; } = new();
}