using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 
[Table("News")]
public class News {

    public DateOnly Date{ get; set; }
    public string Header{ get; set; }
    public string Subheader{ get; set; }
    public string Content{ get; set; }
    public User Author{ get; set; }
    public string Id { get; set; }
}