namespace fbcmanager_api.Database.Models;

public class News : IEntity {
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string Header { get; set; }
    public string Subheader { get; set; }
    public string Content { get; set; }
}