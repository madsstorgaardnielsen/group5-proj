using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 

[Table("Teams")]
public class Team  {

    public string TeamName{ get; set; }
    public List<User> TeamMembers{ get; set; }
    public List<Booking> Bookings { get; set; }
    public string Id { get; set; }
}