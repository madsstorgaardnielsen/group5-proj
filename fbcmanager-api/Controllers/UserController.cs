using AutoMapper;
using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase {
    private readonly ILogger<UserController> _logger;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly DatabaseContext _dbContext;

    public UserController(ILogger<UserController> logger, IMapper mapper,
        UserManager<User> userManager, DatabaseContext dbContext) {
        _logger = logger;
        _mapper = mapper;
        _userManager = userManager;
        _dbContext = dbContext;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteUser([FromBody] string id, CancellationToken ct) {
        var user = await _dbContext.Users.SingleOrDefaultAsync(x => x.Id == id, ct);
        if (user != null) {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin, User")]
    [HttpPut(Name = "UpdateUser")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDTO userDto, CancellationToken ct) {
        if (ModelState.IsValid) {
            var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
            var tokenUtils = new TokenUtils();
            var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

            if (userIdFromToken != userDto.Id && User.IsInRole("Admin") != true) {
                return BadRequest("Invalid data");
            }

            var user = await _dbContext.Users.SingleOrDefaultAsync(x => x.Id == userDto.Id, ct);

            if (user == null) {
                return BadRequest("Invalid data");
            }

            user.UserName = userDto.Email;
            user.NormalizedEmail = userDto.Email.ToUpper();
            user.NormalizedUserName = userDto.Email.ToUpper();

            if (User.IsInRole("Admin")) {
                await _userManager.AddToRolesAsync(user, userDto.Roles);
            }

            _mapper.Map(userDto, user);

            _dbContext.Users.Update(user);

            await _dbContext.SaveChangesAsync(ct);

            return NoContent();
        }

        _logger.LogError($"Error validating data in {nameof(UpdateUser)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreateUser")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO userDto, CancellationToken ct) {
        if (ModelState.IsValid) {
            var user = _mapper.Map<User>(userDto);

            user.PasswordHash = new PwHasher().GetPasswordHash(user, userDto);
            user.UserName = userDto.Email;

            user.UserName = userDto.Email;
            user.NormalizedEmail = userDto.Email.ToUpper();
            user.NormalizedUserName = userDto.Email.ToUpper();

            _dbContext.Users.Add(user);
            await _userManager.AddToRolesAsync(user, userDto.Roles);

            await _dbContext.SaveChangesAsync(ct);

            var result = _mapper.Map<UserDTO>(user);
            return CreatedAtRoute("GetUser", new {id = user.Id}, result);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateUser)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{id}", Name = "GetUser")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUser(string id, CancellationToken ct) {
        var user = await _dbContext.Users.SingleOrDefaultAsync(x => x.Id == id, ct);
        if (user != null) {
            var result = _mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        return NotFound();
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("search", Name = "GetUserByName")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserByName([FromBody] string namelike, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .Where(x => x.Firstname.Contains(namelike) || x.Lastname.Contains(namelike))
            .SingleOrDefaultAsync(ct);

        if (user != null) {
            var result = _mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        return NotFound();
    }

    // [Authorize]
    // [HttpGet("users/paging")]
    // [ProducesResponseType(StatusCodes.Status200OK)]
    // [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    // public async Task<IActionResult> GetUsers([FromQuery] HttpRequestParams httpRequestParams) {
    //     var users = await _unitOfWork.Users.GetAll(httpRequestParams);
    //     var results = _mapper.Map<IList<UserDAO>>(users);
    //     return Ok(results);
    // }

    [Authorize(Roles = "Admin")]
    [HttpGet(Name = "GetAllUsers")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUsers(CancellationToken ct) {
        var users = await _dbContext.Users.ToListAsync(ct);
        var orderedUsers = users.OrderBy(x => x.Firstname);
        var results = _mapper.Map<IList<UserDTO>>(orderedUsers);
        return Ok(results);
    }
}