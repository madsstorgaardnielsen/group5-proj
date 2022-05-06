using fbcmanager_api.Models.DTOs;

namespace fbcmanager_api.Services; 

public interface IAuthService {
    Task<bool> ValidateUser(LoginUserDTO loginUserDto);
    Task<string> CreateToken();


}