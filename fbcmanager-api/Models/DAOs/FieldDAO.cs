using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DAOs; 

public class FieldDAO {
    public string FieldName{ get; set; }
    public string Location{ get; set; }
    public bool IsBooked{ get; set; }
    public DateTime BookedFrom{ get; set; }
    public DateTime BookedTo{ get; set; }
    public Team BookedBy{ get; set; }
}

