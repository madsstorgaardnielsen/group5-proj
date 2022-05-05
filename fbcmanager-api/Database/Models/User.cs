using Microsoft.AspNetCore.Identity;

namespace fbcmanager_api.Database.Models;

public class User : IdentityUser {
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string City { get; set; }
    public string Zip { get; set; }
    public string Street { get; set; }
    public DateOnly Birthdate { get; set; }
    public string TeamId { get; set; }
    public Team Team { get; set; }
    public List<Practise> Practises { get; set; } = new();
    public List<Event> Events { get; set; } = new();

}