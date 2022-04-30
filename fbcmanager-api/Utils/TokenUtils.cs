using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace fbcmanager_api.Utils; 

public class TokenUtils {

    public string GetUserIdFromToken(string token) {
        
        var handler = new JwtSecurityTokenHandler();

        var decodedToken = handler.ReadJwtToken(token);
        
        return decodedToken.Claims.First(claim => claim.Type == "id").Value;
    }
}