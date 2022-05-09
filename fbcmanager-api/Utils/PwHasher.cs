using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using Microsoft.AspNetCore.Identity;

namespace fbcmanager_api.Utils;

public class PwHasher {
    public string GetPasswordHash(User user, CreateUserDTO userDto) {
        var hasher = new PasswordHasher<User>();
        return hasher.HashPassword(user, userDto.Password);
    }
}