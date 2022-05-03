using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 
public class News {

    public DateTime Date{ get; set; }
    public string Header{ get; set; }
    public string Subheader{ get; set; }
    public string Content{ get; set; }
    public string NewsId { get; set; }
}