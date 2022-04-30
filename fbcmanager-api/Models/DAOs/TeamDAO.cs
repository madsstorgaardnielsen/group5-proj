using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DAOs; 

public class TeamDAO {
    public string TeamName{ get; set; }
    public List<User> TeamMembers{ get; set; }
    public List<Booking> Bookings { get; set; }
}