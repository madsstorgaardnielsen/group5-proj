using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Models.DAOs;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<UserController> _logger;
    private readonly IMapper _mapper;

    public UserController(IUnitOfWork unitOfWork, ILogger<UserController> logger, IMapper mapper) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteUser(string id) {
        var user = await _unitOfWork.Users.Get(u => u.Id == id);
        if (user != null) {
            await _unitOfWork.Users.Delete(id);
            await _unitOfWork.Save();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin, User")]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDTO userDto) {
        if (ModelState.IsValid) {
            var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
            var tokenUtils = new TokenUtils();
            var idFromToken = tokenUtils.GetUserIdFromToken(token);

            if (id != idFromToken && User.IsInRole("Admin") != true) {
                return BadRequest("Invalid data");
            }

            var user = await _unitOfWork.Users.Get(u => u.Id == id);

            if (user == null) {
                return BadRequest("Invalid data");
            }


            user.UserName = userDto.Email;
            user.NormalizedEmail = userDto.Email.ToUpper();
            user.NormalizedUserName = userDto.Email.ToUpper();

            _mapper.Map(userDto, user);
            _unitOfWork.Users.Update(user);

            await _unitOfWork.Save();

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
    public async Task<IActionResult> CreateUser([FromBody] UserDTO userDto) {
        if (ModelState.IsValid) {
            var user = _mapper.Map<User>(userDto);

            user.PasswordHash = new PwHasher().GetPasswordHash(user, userDto);
            user.UserName = userDto.Email;

            user.UserName = userDto.Email;
            user.NormalizedEmail = userDto.Email.ToUpper();
            user.NormalizedUserName = userDto.Email.ToUpper();

            await _unitOfWork.Users.Insert(user);
            await _unitOfWork.Save();

            var userDao = _mapper.Map<UserDAO>(user);
            return CreatedAtRoute("GetUser", new {id = user.Id}, userDao);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateUser)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{id}", Name = "GetUser")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUser(string id) {
        var user = await _unitOfWork.Users.Get(u => u.Id == id);
        if (user != null) {
            var result = _mapper.Map<UserDAO>(user);
            return Ok(result);
        }

        return NotFound();
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("name/{query}", Name = "GetUserByName")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetUserByName(string query) {
        var user = await _unitOfWork.Users.Get(u => u.Firstname.Contains(query) || u.Lastname.Contains(query));
        if (user != null) {
            var result = _mapper.Map<UserDAO>(user);
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
    public async Task<IActionResult> GetUsers() {
        var users = await _unitOfWork.Users.GetAll();
        var results = _mapper.Map<IList<UserDAO>>(users);
        return Ok(results);
    }
}