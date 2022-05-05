using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DTOs;

public class TeamDTO {
    public string TeamId { get; set; }
    public string TeamName { get; set; }
    public List<UserDTO> TeamMembers { get; set; }
    public List<Booking> Bookings { get; set; }
}

public class CreateTeamDTO {
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string TeamName { get; set; }
    public List<UserDTO> TeamMembers { get; set; }
    public List<BookingDTO> Bookings { get; set; }
}

public class UpdateTeamDTO : CreateUserDTO {
    [Required] public string TeamId { get; set; }
}