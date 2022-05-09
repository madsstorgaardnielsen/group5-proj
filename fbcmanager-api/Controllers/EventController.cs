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
public class EventController : ControllerBase {
    private readonly ILogger<EventController> _logger;
    private readonly IMapper _mapper;
    private readonly EventRepository _eventRepository;
    private readonly TokenUtils _tokenUtils;

    public EventController(ILogger<EventController> logger, IMapper mapper,
        EventRepository eventRepository, TokenUtils tokenUtils) {
        _logger = logger;
        _mapper = mapper;
        _eventRepository = eventRepository;
        _tokenUtils = tokenUtils;
    }

    [Authorize]
    [HttpPost("join", Name = "JoinEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinEvent([FromBody] EventDTO eventDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var result = await _eventRepository.JoinEvent(eventDTO.Id, userIdFromToken, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize]
    [HttpPost("leave", Name = "LeaveEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeaveEvent([FromBody] EventDTO eventDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var result = await _eventRepository.LeaveEvent(eventDTO.Id, userIdFromToken, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteEvent([FromBody] EventDTO eventDTO, CancellationToken ct) {
        var result = await _eventRepository.Delete(eventDTO.Id, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateEvent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateEvent([FromBody] UpdateEventDTO eventDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var eventEntity = _mapper.Map<Event>(eventDTO);
            var result = await _eventRepository.Update(eventEntity, ct);
            if (result != null) {
                var mappedResult = _mapper.Map<EventDTO>(result);
                return Ok(mappedResult);
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
            var result = await _eventRepository.Create(eventEntity, ct);
            var mappedResult = _mapper.Map<EventDTO>(result);
            return Ok(mappedResult);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateEvent)}");
        return BadRequest(ModelState);
    }

    [HttpGet("{eventId}", Name = "GetEvent")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetEvent(string eventId, CancellationToken ct) {
        var eventEntity = await _eventRepository.GetIncludeParticipants(eventId, ct);
        if (eventEntity != null) {
            var result = _mapper.Map<EventDTO>(eventEntity);
            return Ok(result);
        }

        return NotFound($"event with id: {eventId} not found");
    }

    [HttpGet(Name = "GetAllEvents")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetEvents(CancellationToken ct) {
        var events = await _eventRepository.GetAll(ct);
        var results = _mapper.Map<IList<EventDTO>>(events).OrderBy(x => x.From).ToList();
        if (results.Count > 0) {
            return Ok(results);
        }

        return NotFound("No events found");
    }
}