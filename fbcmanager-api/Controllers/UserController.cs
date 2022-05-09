using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Repositories;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase {
    private readonly ILogger<UserController> _logger;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly UserRepository _userRepository;
    private readonly TokenUtils _tokenUtils;

    public UserController(ILogger<UserController> logger, IMapper mapper,
        UserManager<User> userManager, UserRepository userRepository, TokenUtils tokenUtils) {
        _logger = logger;
        _mapper = mapper;
        _userManager = userManager;
        _userRepository = userRepository;
        _tokenUtils = tokenUtils;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteUser([FromBody] UserDTO userDTO, CancellationToken ct) {
        var result = await _userRepository.Delete(userDTO.Id, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize]
    [HttpGet(Name = "GetUserByToken")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUser(CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var user = await _userRepository.Get(userIdFromToken, ct);

        if (user != null) {
            var result = _mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        return NotFound($"user not found");
    }

    [Authorize]
    [HttpPost("updatepwd", Name = "ChangePassword")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDTO userDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);

        if (userIdFromToken != userDTO.Id) {
            return BadRequest("Error changing password");
        }

        if (ModelState.IsValid) {
            var u = await _userRepository.GetUserNoTracking(userIdFromToken, ct);

            var result = await _userManager.ChangePasswordAsync(u, userDTO.OldPassword, userDTO.NewPassword);
            
            if (result.Succeeded) {
                return NoContent();
            }
        }

        return Unauthorized();
    }

    [Authorize(Roles = "Admin, User")]
    [HttpPut(Name = "UpdateUser")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDTO userDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);

        if (userIdFromToken != userDTO.Id) {
            return BadRequest("Invalid data");
        }

        if (ModelState.IsValid) {
            var u = await _userRepository.GetUserNoTracking(userIdFromToken, ct);

            u.Firstname = userDTO.Firstname;
            u.Lastname = userDTO.Lastname;
            u.City = userDTO.City;
            u.Zip = userDTO.Zip;
            u.Street = userDTO.Street;
            u.Birthdate = userDTO.Birthdate;
            u.Email = userDTO.Email;
            u.PhoneNumber = userDTO.PhoneNumber;
            u.UserName = userDTO.Email;
            u.NormalizedEmail = userDTO.Email.ToUpper();
            u.NormalizedUserName = userDTO.Email.ToUpper();


            var result = await _userRepository.Update(u, ct);
            if (result != null) {
                var mappedResult = _mapper.Map<UserDTO>(result);
                return Ok(mappedResult);
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdateUser)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreateUser")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO userDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var user = _mapper.Map<User>(userDTO);
            user.PasswordHash = new PwHasher().GetPasswordHash(user, userDTO);
            
            var username = userDTO.Email.Split("@")[0];
            user.UserName = username;
            user.NormalizedUserName = username.ToUpper();
            
            user.NormalizedEmail = userDTO.Email.ToUpper();
            var result = await _userRepository.Create(user, ct);
            
            await _userManager.AddToRolesAsync(result, userDTO.Roles);

            // _mapper.Map(userDTO, user);

            if (result != null) {
                var mappedResult = _mapper.Map<UserDTO>(result);
                return Accepted();
            }
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateUser)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{userId}", Name = "Get")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUser(string userId, CancellationToken ct) {
        var user = await _userRepository.Get(userId, ct);


        if (user != null) {
            var result = _mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        return NotFound($"user with id: {userId} not found");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("search/{namelike}", Name = "GetUserByName")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserByName(string namelike, CancellationToken ct) {
        var user = await _userRepository.GetUserByName(namelike, ct);

        if (user != null) {
            var result = _mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        return NotFound($"user with firstname or lastname containing: {namelike} not found.");
    }


    [Authorize(Roles = "Admin")]
    [HttpGet("/all", Name = "GetAllUsers")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUsers(CancellationToken ct) {
        var users = await _userRepository.GetAll(ct);
        var results = _mapper.Map<IList<UserDTO>>(users).OrderBy(x => x.Firstname).ToList();
        if (results.Count > 0) {
            return Ok(results);
        }

        return NotFound("No users found");
    }
}