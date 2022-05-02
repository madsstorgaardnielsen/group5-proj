using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 
public class Practise {

    public Team Team{ get; set; }
    public Field Location { get; set; }
    public DateTime Date{ get; set; }
    public List<User> Participants{ get; set; } = new();

    public string PractiseId { get; set; }
}