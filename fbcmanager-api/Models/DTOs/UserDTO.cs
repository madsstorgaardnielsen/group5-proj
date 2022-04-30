using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class UserDTO : LoginUserDTO {
    [Required]
    [StringLength(10, MinimumLength = 10)]
    public string Cpr { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Firstname { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Lastname { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Address { get; set; } //TODO deles op i land, by, postnummer, vej, nummer, etage

    [Required]
    [DataType(DataType.PhoneNumber)]
    [StringLength(11, MinimumLength = 8)]
    public string PhoneNumber { get; set; }

    [Required]
    public ICollection<string> Roles { get; set; }

    public override string ToString() {
        return "email: " + Email + "\nPassword: " + Password;
    }
}

public class LoginUserDTO {
    [Required]
    [DataType(DataType.EmailAddress)]
    [StringLength(200, MinimumLength = 2)]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [StringLength(200, MinimumLength = 2)]
    public string Password { get; set; }
}

public class UpdateUserDTO : UserDTO {
}