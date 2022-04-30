using System.ComponentModel.DataAnnotations.Schema;

namespace fbcmanager_api.Database.Models; 
[Table("Practises")]
public class Practise {

    public Team Team{ get; set; }
    public Field Location { get; set; }
    public DateOnly Date{ get; set; }
    public TimeOnly From{ get; set; }
    public TimeOnly To { get; set; }
    public List<User> Participants{ get; set; }

    public string Id { get; set; }
}