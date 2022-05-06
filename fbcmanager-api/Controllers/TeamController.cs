using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Repositories;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class TeamController : ControllerBase {
    private readonly IMapper _mapper;
    private readonly ILogger<TeamController> _logger;
    private readonly TeamRepository _teamRepository;
    private readonly TokenUtils _tokenUtils;

    public TeamController(IMapper mapper, TeamRepository teamRepository, TokenUtils tokenUtils,
        ILogger<TeamController> logger) {
        _logger = logger;
        _mapper = mapper;
        _teamRepository = teamRepository;
        _tokenUtils = tokenUtils;
    }

    [Authorize]
    [HttpPost("join")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinTeam([FromBody] TeamDTO teamDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var result = await _teamRepository.JoinTeam(teamDTO.Id, userIdFromToken, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize]
    [HttpPost("leave")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeaveTeam([FromBody] TeamDTO teamDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var result = await _teamRepository.LeaveTeam(teamDTO.Id, userIdFromToken, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteTeam([FromBody] TeamDTO teamDTO, CancellationToken ct) {
        var result = await _teamRepository.Delete(teamDTO.Id, ct);
        return result ? NoContent() : BadRequest();
    }


    [Authorize]
    [HttpPut(Name = "UpdateTeam")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateTeam([FromBody] UpdateTeamDTO teamDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var team = _mapper.Map<Team>(teamDTO);
            var result = await _teamRepository.Update(team, ct);

            if (result != null) {
                var updatedTeam = _mapper.Map<TeamDTO>(result);
                return Ok(updatedTeam);
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
            var result = await _teamRepository.Create(team, ct);
            var mappedResult = _mapper.Map<TeamDTO>(result);
            return Ok(mappedResult);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateTeam)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{teamId}", Name = "GetTeam")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTeam(string teamId, CancellationToken ct) {
        var team = await _teamRepository.GetIncludeMembers(teamId, ct);

        if (team != null) {
            var result = _mapper.Map<TeamDTO>(team);
            return Ok(result);
        }

        return NotFound($"team with id: {teamId} not found");
    }

    [Authorize]
    [HttpGet(Name = "GetAllTeams")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTeams(CancellationToken ct) {
        var teams = await _teamRepository.GetAll(ct);
        var results = _mapper.Map<IList<TeamDTO>>(teams).OrderBy(x => x.TeamName).ToList();
        if (results.Count > 0) {
            return Ok(results);
        }

        return NotFound("No teams found");
    }
}