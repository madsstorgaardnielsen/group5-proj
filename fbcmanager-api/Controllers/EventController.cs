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
public class EventController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<EventController> _logger;
    private readonly IMapper _mapper;

    public EventController(IUnitOfWork unitOfWork, ILogger<EventController> logger, IMapper mapper) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
    }

    [Authorize]
    [HttpPost("join", Name = "JoinEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinEvent([FromBody] string eventId, string userId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        if (userIdFromToken != userId && User.IsInRole("Admin") != true) {
            return BadRequest("Invalid data");
        }

        var eventEntity = await _unitOfWork.Events.Get(p => p.Id == eventId);
        var user = await _unitOfWork.Users.Get(u => u.Id == userId);
        if (eventEntity != null && user != null) {
            eventEntity.Participants.Add(user);
            await _unitOfWork.Save();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("leave", Name = "LeaveEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeaveEvent([FromBody] string eventId, string userId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        if (userIdFromToken != userId && User.IsInRole("Admin") != true) {
            return BadRequest("Invalid data");
        }

        var user = await _unitOfWork.Users.Get(user => user.Id == userId);
        var eventEntity = await _unitOfWork.Events.Get(u => u.Id == eventId);
        if (eventEntity != null && user != null && eventEntity.Participants.Contains(user)) {
            eventEntity.Participants.Remove(user);
            await _unitOfWork.Save();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteEvent(string id) {
        var eventEntity = await _unitOfWork.Events.Get(u => u.Id == id);
        if (eventEntity != null) {
            await _unitOfWork.Events.Delete(id);
            await _unitOfWork.Save();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateEvent(string id, [FromBody] UpdateEventDTO eventDTO) {
        if (ModelState.IsValid) {
            var eventEntity = await _unitOfWork.Events.Get(u => u.Id == id);

            if (eventEntity == null) {
                return BadRequest("Invalid data");
            }

            _mapper.Map(eventDTO, eventEntity);
            _unitOfWork.Events.Update(eventEntity);

            await _unitOfWork.Save();

            return NoContent();
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
            await _unitOfWork.Events.Insert(eventEntity);
            await _unitOfWork.Save();

            var eventDAO = _mapper.Map<EventDAO>(eventEntity);
            return CreatedAtRoute("GetEvent", new {id = eventEntity.Id}, eventDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateEvent)}");
        return BadRequest(ModelState);
    }

    [HttpGet("events/{id}", Name = "GetEvent")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetEvent(string id) {
        var eventEntity = await _unitOfWork.Events.Get(u => u.Id == id);
        if (eventEntity != null) {
            var result = _mapper.Map<EventDAO>(eventEntity);
            return Ok(result);
        }

        return NotFound();
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