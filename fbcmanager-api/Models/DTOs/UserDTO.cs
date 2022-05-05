using System.ComponentModel.DataAnnotations;

namespace fbcmanager_api.Models.DTOs;

public class UserDTO  {
    [Required] public string Id { get; set; }
    
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Firstname { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Lastname { get; set; }
    
    [Required]
    [DataType(DataType.EmailAddress)]
    [StringLength(200, MinimumLength = 2)]
    public string Email { get; set; }
    
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string City { get; set; }

    [Required]
    [StringLength(4, MinimumLength = 4)]
    public string Zip { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Street { get; set; }

    [Required]
    [DataType(DataType.PhoneNumber)]
    [StringLength(11, MinimumLength = 8)]
    public string PhoneNumber { get; set; }
    
}

public class UpdateUserDTO : CreateUserDTO {
    [Required] public string Id { get; set; }
}

public class CreateUserDTO {
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Firstname { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Lastname { get; set; }

    [Required] public ICollection<string> Roles { get; set; }
    
    [Required]
    [DataType(DataType.EmailAddress)]
    [StringLength(200, MinimumLength = 2)]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [StringLength(200, MinimumLength = 2)]
    public string Password { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string City { get; set; }

    [Required]
    [StringLength(4, MinimumLength = 4)]
    public string Zip { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Street { get; set; }

    [Required]
    [DataType(DataType.PhoneNumber)]
    [StringLength(11, MinimumLength = 8)]
    public string PhoneNumber { get; set; }
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