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
public class TeamController : ControllerBase {
    private readonly ILogger<TeamController> _logger;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly DatabaseContext _dbContext;

    public TeamController(ILogger<TeamController> logger, IMapper mapper, UserManager<User> userManager,
        DatabaseContext dbContext) {
        _logger = logger;
        _mapper = mapper;
        _userManager = userManager;
        _dbContext = dbContext;
    }

    [Authorize]
    [HttpPost("join")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinTeam([FromBody] TeamDTO teamDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);
        
        
        var user = await _dbContext.Users.Where(x => x.Id == userIdFromToken).Include(x => x.Team)
            .SingleOrDefaultAsync(ct);
        var team = await _dbContext.Teams.SingleOrDefaultAsync(x => x.TeamId == teamDTO.TeamId, ct);

        if (team != null && user != null) {
            user.Team = team;
            await _dbContext.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("leave")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeaveTeam([FromBody] string teamId, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _dbContext.Users.Where(x => x.Id == userIdFromToken).Include(x => x.Team)
            .SingleOrDefaultAsync(ct);
        var team = await _dbContext.Teams.SingleOrDefaultAsync(x => x.TeamId == teamId, ct);

        if (team != null && user != null) {
            user.Team = null;
            await _dbContext.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteTeam([FromBody] TeamDTO teamDTO, CancellationToken ct) {
        var team = await _dbContext.Teams.SingleOrDefaultAsync(x => x.TeamId == teamDTO.TeamId, ct);

        if (team != null) {
            _dbContext.Teams.Remove(team);
            await _dbContext.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPut(Name = "UpdateTeam")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateTeam([FromBody] UpdateTeamDTO teamDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var team = await _dbContext.Teams.SingleOrDefaultAsync(x => x.TeamId == teamDTO.TeamId, ct);
            _mapper.Map(teamDTO, team);

            if (team != null) {
                _dbContext.Teams.Update(team);
                await _dbContext.SaveChangesAsync(ct);
                return NoContent();
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdateTeam)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpPost(Name = "CreateTeam")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateTeam([FromBody] TeamDTO teamDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var team = _mapper.Map<Team>(teamDTO);

            _dbContext.Teams.Add(team);
            await _dbContext.SaveChangesAsync(ct);

            return Ok(new {team.TeamId});
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateTeam)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{teamId}", Name = "GetTeam")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTeam(string teamId, CancellationToken ct) {
        var team = await _dbContext
            .Teams
            .Where(x => x.TeamId == teamId)
            .Include(x => x.TeamMembers)
            .Include(x => x.Bookings)
            .SingleOrDefaultAsync(ct);

        if (team != null) {
            var result = _mapper.Map<TeamDTO>(team);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet(Name = "GetAllTeams")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTeams(CancellationToken ct) {
        var teams = await _dbContext.Teams.OrderBy(x => x.TeamName).ToListAsync(ct);
        // var orderedList = teams.OrderBy(x => x.TeamName);
        var results = _mapper.Map<IList<TeamDTO>>(teams);
        return Ok(new {results});
    }
}