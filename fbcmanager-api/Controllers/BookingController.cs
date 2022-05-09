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
public class BookingController : ControllerBase {
    private readonly ILogger<BookingController> _logger;
    private readonly IMapper _mapper;
    private readonly BookingRepository _bookingRepository;
    private readonly TeamRepository _teamRepository;
    private readonly TokenUtils _tokenUtils;

    public BookingController(ILogger<BookingController> logger, IMapper mapper, BookingRepository bookingRepository,
        TeamRepository teamRepository,
        TokenUtils tokenUtils) {
        _logger = logger;
        _mapper = mapper;
        _bookingRepository = bookingRepository;
        _tokenUtils = tokenUtils;
        _teamRepository = teamRepository;
    }

    [Authorize]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteBooking([FromBody] BookingDTO bookingDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var idFromToken = _tokenUtils.GetUserIdFromToken(token);

        var team = await _teamRepository.GetIncludeMembers(bookingDTO.TeamId, ct);
        var user = team.TeamMembers.SingleOrDefault(x => x.Id == idFromToken);

        if (team.TeamMembers.Contains(user) && User.IsInRole("Admin")) {
            await _bookingRepository.Delete(bookingDTO.Id, ct);
            return NoContent();
        }

        return BadRequest("You cant delete a team you are not part of");
    }

    [Authorize]
    [HttpPut(Name = "UpdateBooking")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateBooking([FromBody] UpdateBookingDTO bookingDTO, CancellationToken ct) {
        
        if (ModelState.IsValid) {
            var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
            var idFromToken = _tokenUtils.GetUserIdFromToken(token);

            var team = await _teamRepository.GetIncludeMembers(bookingDTO.TeamId, ct);

            var user = team.TeamMembers.SingleOrDefault(x => x.Id == idFromToken);

            if (user == null) {
                return BadRequest("user not found");
            }
            if (!team.TeamMembers.Contains(user)) {
                return BadRequest("You cant update a booking for a team you are not part of");
            }

            var booking = _mapper.Map<Booking>(bookingDTO);
            var bookings = await _bookingRepository.GetAll(ct);

            var hasOverlap = false;
            foreach (var b in bookings
                         .Where(b =>
                             b.BookedTo >= booking.BookedFrom
                             && b.BookedFrom < booking.BookedTo
                             && booking.FieldId == b.FieldId)) {
                hasOverlap = true;
            }

            if (hasOverlap) {
                return BadRequest(
                    "already booked in period");
            }

            var result = await _bookingRepository.Update(booking,ct);
            if (result != null) {
                var mappedResult = _mapper.Map<BookingDTO>(result);
                return Ok(mappedResult);
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdateBooking)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpPost(Name = "CreateBooking")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDTO bookingDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
            var idFromToken = _tokenUtils.GetUserIdFromToken(token);

            var team = await _teamRepository.GetIncludeMembers(bookingDTO.TeamId, ct);
            var user = team.TeamMembers.SingleOrDefault(x => x.Id == idFromToken);

            if (!team.TeamMembers.Contains(user)) {
                return BadRequest("You cant create a booking for a team you are not part of");
            }

            var booking = _mapper.Map<Booking>(bookingDTO);
            var bookings = await _bookingRepository.GetAllIncludingFieldAndTeam(ct);

            var hasOverlap = false;
            Booking alreadyBooked = null;
            foreach (var t in bookings.Where(t =>
                         t.BookedTo >= booking.BookedFrom && t.BookedFrom < booking.BookedTo)) {
                hasOverlap = true;
                alreadyBooked = t;
            }

            if (hasOverlap) {
                return BadRequest(
                    $"{alreadyBooked.Field.FieldName} is already booked in period {booking.BookedFrom} to {booking.BookedTo}");
            }

            var result = await _bookingRepository.Create(booking, ct);
            var mappedResult = _mapper.Map<BookingDTO>(result);
            return Ok(mappedResult);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateBooking)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{bookingId}", Name = "GetBooking")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetBooking(string bookingId, CancellationToken ct) {
        var booking = await _bookingRepository.Get(bookingId, ct);
        if (booking != null) {
            var result = _mapper.Map<BookingDTO>(booking);
            return Ok(result);
        }

        return NotFound($"booking with id: {bookingId} not found");
    }


    [Authorize]
    [HttpGet(Name = "GetAllBookings")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetBookings(CancellationToken ct) {
        var bookings = await _bookingRepository.GetAll(ct);
        var results = _mapper.Map<IList<BookingDTO>>(bookings).OrderBy(x => x.BookedFrom).ToList();
        if (results.Count > 0) {
            return Ok(results);
        }

        return NotFound("No bookings found");
    }
}