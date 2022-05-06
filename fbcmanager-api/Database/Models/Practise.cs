using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 
public class Practise {

    public string PractiseId { get; set; }
    public string TeamId{ get; set; }
    public string FieldId { get; set; }
    public DateTime Date{ get; set; }
    public List<User> Participants{ get; set; } = new();

}