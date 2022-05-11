namespace fbcmanager_api.Database.Models;

public class Team : IEntity {
    public string Id { get; set; }
    public string TeamName { get; set; }
    public List<Practise> Practises { get; set; } = new();
    public List<User> TeamMembers { get; set; } = new();
    public List<Booking> Bookings { get; set; } = new();
    public byte[] Timestamp { get; set; }
}