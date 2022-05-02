using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DAOs;

public class EventDAO {
    public string EventId { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Header { get; set; }
    public DateTime From{ get; set; }
    public DateTime To{ get; set; }
    public double Price { get; set; }
    public List<User> Participants{ get; set; } = new();
}