namespace fbcmanager_api.Database.Models;

public class Field : IEntity {
    public string Id { get; set; }
    public string FieldName { get; set; }
    public string Location { get; set; }
    public List<Practise> Practises { get; set; }
    public List<Booking> Bookings { get; set; }
}