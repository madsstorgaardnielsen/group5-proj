using AutoMapper;
using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class PractiseController : ControllerBase {
    private readonly ILogger<PractiseController> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _dbCon;

    public PractiseController(ILogger<PractiseController> logger, IMapper mapper,
        DatabaseContext dbCon) {
        _logger = logger;
        _mapper = mapper;
        _dbCon = dbCon;
    }

    [Authorize]
    [HttpGet("joined", Name = "GetAllJoinedPractises")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllJoinedPractises([FromBody] UserDTO userDTO, CancellationToken ct) {
        var userPractises =
            await _dbCon.Users.Where(x => x.Id == userDTO.Id).Include(x => x.Practises).SingleOrDefaultAsync(ct);

        if (userPractises != null) {
            return Ok(userPractises);
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("join", Name = "JoinPractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinPractise([FromBody] PractiseDTO practiseDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);
        
        var user = await _dbCon
            .Users
            .SingleOrDefaultAsync(x => x.Id == userIdFromToken, ct);
        
        var practise = await _dbCon.Practises.Where(x => x.PractiseId == practiseDTO.PractiseId)
            .Include(x => x.Participants)
            .SingleOrDefaultAsync(ct);
        
        if (user != null && practise != null) {
            practise.Participants.Add(user);
            await _dbCon.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("leave", Name = "LeavePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeavePractise([FromBody] PractiseDTO practiseDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _dbCon
            .Users
            .SingleOrDefaultAsync(x => x.Id == userIdFromToken, ct);
        
        var practise = await _dbCon.Practises.Where(x => x.PractiseId == practiseDTO.PractiseId)
            .Include(x => x.Participants)
            .SingleOrDefaultAsync(ct);
        
        if (user != null && practise != null) {
            practise.Participants.Remove(user);
            await _dbCon.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }


    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePractise([FromBody] PractiseDTO practiseDTO, CancellationToken ct) {
        var practise = await _dbCon.Practises.SingleOrDefaultAsync(x => x.PractiseId == practiseDTO.PractiseId, ct);

        if (practise != null) {
            _dbCon.Practises.Remove(practise);
            await _dbCon.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdatePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdatePractise([FromBody] UpdatePractiseDTO practiseDTO,
        CancellationToken ct) {
        if (ModelState.IsValid) {
            var practise = await _dbCon.Practises.SingleOrDefaultAsync(x => x.PractiseId == practiseDTO.PractiseId, ct);
            _mapper.Map(practiseDTO, practise);

            if (practise != null) {
                _dbCon.Practises.Update(practise);
                await _dbCon.SaveChangesAsync(ct);
                return NoContent();
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreatePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePractise([FromBody] CreatePractiseDTO practiseDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var practise = _mapper.Map<Practise>(practiseDTO);

            _dbCon.Practises.Add(practise);
            await _dbCon.SaveChangesAsync(ct);

            var result = _mapper.Map<PractiseDTO>(practise);
            // return CreatedAtRoute("GetPractise", new {id = practise.PractiseId}, practiseDAO);
            return Ok(result);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{practiseId}", Name = "GetPractise")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractise(string practiseId, CancellationToken ct) {
        var practise = await _dbCon.Practises.Where(x => x.PractiseId == practiseId).Include(x => x.Participants)
            .SingleOrDefaultAsync(ct);

        if (practise != null) {
            var result = _mapper.Map<PractiseDTO>(practise);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet(Name = "GetAllPractises")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractises(CancellationToken ct) {
        var practises = await _dbCon.Practises.OrderBy(x => x.Date).ToListAsync(ct);
        var results = _mapper.Map<IList<PractiseDTO>>(practises);
        return Ok(results);
    }
}