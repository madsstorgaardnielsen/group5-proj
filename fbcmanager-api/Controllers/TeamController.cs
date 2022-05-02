using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Models.DAOs;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class TeamController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<TeamController> _logger;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public TeamController(IUnitOfWork unitOfWork, ILogger<TeamController> logger, IMapper mapper,UserManager<User> userManager) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
        _userManager = userManager;
    }

    [Authorize]
    [HttpPost("join/{teamId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinTeam(string teamId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _unitOfWork.Users.Get(user => user.Id == userIdFromToken);
        var team = await _unitOfWork.Teams.Get(u => u.TeamId == teamId);

        if (team != null && user != null) {
            user.Team = team;
            _unitOfWork.Users.Update(user);
            await _unitOfWork.Save();

            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("leave/{teamId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeaveTeam(string teamId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _unitOfWork.Users.Get(user => user.Id == userIdFromToken);
        var team = await _unitOfWork.Teams.Get(u => u.TeamId == teamId);

        if (team != null && user != null) {
            user.TeamId = null;
            _unitOfWork.Users.Update(user);
                
            await _unitOfWork.Save();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpDelete("{teamId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteTeam(string teamId) {
        // var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        // var tokenUtils = new TokenUtils();
        // var userIdFromToken = tokenUtils.GetUserIdFromToken(token);
        //
        // var user = await _unitOfWork.Users.Get(user => user.Id == userIdFromToken);

        if (User.IsInRole("Admin") != true) {
            _logger.LogInformation($"Identity error in {nameof(DeleteTeam)}");
            return BadRequest();
        }

        var team = await _unitOfWork.Teams.Get(u => u.TeamId == teamId);
        if (team != null) {
            await _unitOfWork.Teams.Delete(teamId);
            await _unitOfWork.Save();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPut("{teamId}", Name = "UpdateTeam")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateTeam(string teamId, [FromBody] TeamDTO teamDTO) {
        _logger.LogInformation("attempting UpdateTeam");
        if (ModelState.IsValid) {
            var team = await _unitOfWork.Teams.Get(u => u.TeamId == teamId);

            if (team == null) {
                return BadRequest("Invalid team data");
            }

            _mapper.Map(teamDTO, team);
            _unitOfWork.Teams.Update(team);
            await _unitOfWork.Save();
            var result = _mapper.Map<TeamDAO>(team);
            return Ok(new {result.TeamName});
        }

        _logger.LogError($"Error validating data in {nameof(UpdateTeam)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpPost(Name = "CreateTeam")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateTeam([FromBody] TeamDTO teamDTO) {
        if (ModelState.IsValid) {
            var team = _mapper.Map<Team>(teamDTO);
            await _unitOfWork.Teams.Insert(team);
            await _unitOfWork.Save();

            var teamDAO = _mapper.Map<TeamDAO>(team);
            // return CreatedAtRoute("GetTeam", new {id = team.Id}, teamDAO);
            return Ok(new {team.TeamId});
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateTeam)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{teamId}", Name = "GetTeam")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTeam(string teamId) {
        var team = await _unitOfWork.Teams.Get(u => u.TeamId == teamId, new List<string> {"TeamMembers", "Bookings"});
        if (team != null) {
            var result = _mapper.Map<TeamDAO>(team);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet(Name = "GetAllTeams")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTeams() {
        var teams = await _unitOfWork.Teams.GetAll();
        var results = _mapper.Map<IList<TeamDAO>>(teams);
        return Ok(new {results});
    }
}