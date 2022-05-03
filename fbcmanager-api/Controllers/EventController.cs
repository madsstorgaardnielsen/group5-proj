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
public class EventController : ControllerBase {
    private readonly ILogger<EventController> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _dbCon;

    public EventController(ILogger<EventController> logger, IMapper mapper,
        DatabaseContext dbCon) {
        _logger = logger;
        _mapper = mapper;
        _dbCon = dbCon;
    }

    [Authorize]
    [HttpPost("join", Name = "JoinEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinEvent([FromBody] EventDTO eventDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);
        
        var user = await _dbCon
            .Users
            .SingleOrDefaultAsync(x => x.Id == userIdFromToken, ct);
        
        var eventEntity = await _dbCon
            .Events
            .Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.EventId == eventDTO.EventId, ct);
        
        if (user != null && eventEntity != null) {
            eventEntity.Participants.Add(user);
            await _dbCon.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("leave", Name = "LeaveEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeaveEvent([FromBody]EventDTO eventDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _dbCon
            .Users
            .SingleOrDefaultAsync(x => x.Id == userIdFromToken, ct);

        var eventEntity = await _dbCon
            .Events
            .Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.EventId == eventDTO.EventId, ct);

        if (user != null && eventEntity != null) {
            eventEntity.Participants.Remove(user);
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
    public async Task<IActionResult> DeleteEvent([FromBody] EventDTO eventDTO, CancellationToken ct) {
        var eventEntity = await _dbCon
            .Events
            .Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.EventId == eventDTO.EventId, ct);

        if (eventEntity != null) {
            _dbCon.Events.Remove(eventEntity);
            await _dbCon.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateEvent([FromBody] UpdateEventDTO eventDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var eventEntity = await _dbCon.Events.SingleOrDefaultAsync(x => x.EventId == eventDTO.EventId, ct);
            _mapper.Map(eventDTO, eventEntity);

            if (eventEntity != null) {
                _dbCon.Events.Update(eventEntity);
                await _dbCon.SaveChangesAsync(ct);
                return NoContent();
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdateEvent)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreateEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventDTO eventDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var eventEntity = _mapper.Map<Event>(eventDTO);

            _dbCon.Events.Add(eventEntity);
            await _dbCon.SaveChangesAsync(ct);


            var eventDAO = _mapper.Map<EventDTO>(eventEntity);
            return CreatedAtRoute("GetEvent", new {id = eventEntity.EventId}, eventDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateEvent)}");
        return BadRequest(ModelState);
    }

    [HttpGet("{id}", Name = "GetEvent")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetEvent(string id, CancellationToken ct) {
        var eventEntity = await _dbCon.Events.Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.EventId == id, ct);

        var result = _mapper.Map<Event, EventDTO>(eventEntity);
        
        if (eventEntity != null) {
            return Ok(new {result});
        }

        return NotFound();
    }

    [HttpGet(Name = "GetAllEvents")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetEvents(CancellationToken ct) {
        var eventEntity = await _dbCon.Events.OrderBy(x => x.From).ToListAsync(ct);
        var results = _mapper.Map<IList<EventDTO>>(eventEntity);
        return Ok(results);
    }
}