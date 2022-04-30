using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase {
    private readonly UserManager<User> _userManager;
    private readonly ILogger<AuthController> _logger;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public AuthController(
        UserManager<User> userManager,
        ILogger<AuthController> logger,
        IMapper mapper, IAuthService authService) {
        _userManager = userManager;
        _logger = logger;
        _mapper = mapper;
        _authService = authService;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDTO loginUserDto) {

        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        if (await _authService.ValidateUser(loginUserDto)) {
            return Accepted(new {Token = await _authService.CreateToken()});
        }

        return Unauthorized();
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Register([FromBody] UserDTO userDto) {
        _logger.LogInformation($"Init registration attempt: {userDto.Email}");

        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        var user = _mapper.Map<User>(userDto);
        user.UserName = userDto.Email;

        var result = await _userManager.CreateAsync(user, userDto.Password);

        if (!result.Succeeded) {
            foreach (var error in result.Errors) {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return BadRequest(ModelState);
        }

        await _userManager.AddToRolesAsync(user, userDto.Roles);
        return Accepted();
    }
}