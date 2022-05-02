using AutoMapper;
using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Models.DAOs;
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
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<EventController> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _dbCon;

    public EventController(IUnitOfWork unitOfWork, ILogger<EventController> logger, IMapper mapper,
        DatabaseContext dbCon) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
        _dbCon = dbCon;
    }

    [Authorize]
    [HttpPost("join/{eventId}", Name = "JoinEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinEvent(string eventId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _dbCon
            .Users
            .FindAsync(userIdFromToken);

        var eventEntity = await _dbCon
            .Events
            .Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.EventId == eventId);

        if (user != null && eventEntity != null) {
            eventEntity.Participants.Add(user);
            await _dbCon.SaveChangesAsync();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("leave/{eventId}", Name = "LeaveEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeaveEvent(string eventId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _dbCon
            .Users
            .FindAsync(userIdFromToken);

        var eventEntity = await _dbCon
            .Events
            .Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.EventId == eventId);

        if (user != null && eventEntity != null) {
            eventEntity.Participants.Remove(user);
            await _dbCon.SaveChangesAsync();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteEvent(string id) {
        var eventEntity = await _dbCon.Events.FindAsync(id);

        if (eventEntity != null) {
            _dbCon.Events.Remove(eventEntity);
            await _dbCon.SaveChangesAsync();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateEvent([FromBody] UpdateEventDTO eventDTO) {
        if (ModelState.IsValid) {
            var eventEntity = await _dbCon.Events.FindAsync(eventDTO.EventId);
            _mapper.Map(eventDTO, eventEntity);

            if (eventEntity != null) {
                _dbCon.Events.Update(eventEntity);
                await _dbCon.SaveChangesAsync();
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
    public async Task<IActionResult> CreateEvent([FromBody] EventDTO eventDTO) {
        if (ModelState.IsValid) {
            var eventEntity = _mapper.Map<Event>(eventDTO);

            await _dbCon.Events.AddAsync(eventEntity);
            await _dbCon.SaveChangesAsync();
            
            // await _unitOfWork.Events.Insert(eventEntity);
            // await _unitOfWork.Save();

            var eventDAO = _mapper.Map<EventDAO>(eventEntity);
            return CreatedAtRoute("GetEvent", new {id = eventEntity.EventId}, eventDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateEvent)}");
        return BadRequest(ModelState);
    }

    [HttpGet("{id}", Name = "GetEvent")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetEvent(string id) {
        // var eventEntity = await _unitOfWork.Events.Get(u => u.EventId == id, new List<string> {"Participants"});

        var e = await _dbCon.Events.Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.EventId == id);

        return Ok(e);
        //
        // if (eventEntity != null) {
        //     var result = _mapper.Map<EventDAO>(eventEntity);
        //     return Ok(result);
        // }
        //
        // return NotFound();
    }

    [HttpGet(Name = "GetAllEvents")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetEvents() {
        var eventEntity = await _unitOfWork.Events.GetAll();
        var results = _mapper.Map<IList<EventDAO>>(eventEntity);
        return Ok(results);
    }
}