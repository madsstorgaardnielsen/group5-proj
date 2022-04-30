using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 
[Table("Fields")]
public class Field {

    public string FieldName{ get; set; }
    public string Location{ get; set; }
    public bool IsBooked{ get; set; }
    public DateTime BookedFrom{ get; set; }
    public DateTime BookedTo{ get; set; }
    public Team BookedBy{ get; set; }

    public string Id { get; set; }
}