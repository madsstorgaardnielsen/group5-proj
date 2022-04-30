using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace fbcmanager_api.Services;

public class AuthService : IAuthService {
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private User _user;

    public AuthService(UserManager<User> userManager, IConfiguration configuration) {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<bool> ValidateUser(LoginUserDTO loginUserDto) {
        _user = await _userManager.FindByNameAsync(loginUserDto.Email);
        return (_user != null && await _userManager.CheckPasswordAsync(_user, loginUserDto.Password));
    }

    public async Task<string> CreateToken() {
        var signingCredentials = GetSigningCredentials();
        var claims = await GetClaims();
        var token = GenerateTokenOptions(signingCredentials, claims);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims) {
        var jwtSettings = _configuration.GetSection("JwtToken");

        var expiration = DateTime
            .Now
            .AddMinutes(15);

        var issuer = jwtSettings.GetSection("Issuer").Value;

        var token = new JwtSecurityToken(
            issuer: issuer,
            claims: claims,
            expires: expiration,
            signingCredentials: signingCredentials
        );

        return token;
    }

    private async Task<List<Claim>> GetClaims() {
        
        var claims = new List<Claim> {
            new(ClaimTypes.Name, _user.UserName),
            new("id", _user.Id)
        };

        var roles = await _userManager.GetRolesAsync(_user);

        claims.AddRange(roles
            .Select(role => new Claim(ClaimTypes.Role, role)));
        return claims;
    }

    private SigningCredentials GetSigningCredentials() {
        var jwtSettings = _configuration.GetSection("JwtToken");
        var key = jwtSettings.GetSection("Key").Value;
        var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }
}