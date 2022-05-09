namespace fbcmanager_api.Database.Models;

public class Practise : IEntity {
    public string Id { get; set; }
    public string TeamId { get; set; }
    public Team Team { get; set; }
    public string FieldId { get; set; }
    public Field Field { get; set; }
    public DateTime Date { get; set; }
    public List<User> Participants { get; set; } = new();
}