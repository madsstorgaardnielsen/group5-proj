using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DAOs;

public class UserDAO {
    public string Firstname { get; set; } = string.Empty;
    public string Lastname { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public List<Team> Teams { get; set; }
    public List<Practise> Practises { get; set; }
    public List<Event> Events { get; set; }
}