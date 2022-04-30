namespace fbcmanager_api.Models.DAOs;

public class EventDAO {
    public long Id { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Header { get; set; }
    public DateOnly Date { get; set; }
    public TimeOnly From { get; set; }
    public TimeOnly To { get; set; }
    public double Price { get; set; }
}