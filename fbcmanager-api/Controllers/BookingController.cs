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
public class BookingController : ControllerBase {
    private readonly ILogger<BookingController> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _dbContext;

    public BookingController(ILogger<BookingController> logger, IMapper mapper, DatabaseContext dbContext) {
        _logger = logger;
        _mapper = mapper;
        _dbContext = dbContext;
    }


    [Authorize]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteBooking([FromBody] BookingDTO bookingDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var idFromToken = tokenUtils.GetUserIdFromToken(token);
        
        var user = await _dbContext.Users.Include(x => x.Team).SingleOrDefaultAsync(x => x.Id == idFromToken, ct);
        
        var booking =
            await _dbContext.Bookings.SingleOrDefaultAsync(x=> x.BookingId == bookingDTO.BookingId, ct);
        
        if (user != null && booking != null) {
            _dbContext.Bookings.Remove(booking);
            await _dbContext.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    //TODO check om der allerede er booket i tidsrummet
    [Authorize]
    [HttpPut(Name = "UpdateBooking")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateBooking([FromBody] UpdateBookingDTO bookingDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var booking = await _dbContext.Bookings.SingleOrDefaultAsync(x => x.BookingId == bookingDTO.BookingId, ct);

            if (booking != null) {
                _mapper.Map(bookingDTO, booking);
                _dbContext.Bookings.Update(booking);
                await _dbContext.SaveChangesAsync(ct);
                return NoContent();
            }

            return BadRequest("Invalid data");
        }

        _logger.LogError($"Error validating data in {nameof(UpdateBooking)}");
        return BadRequest(ModelState);
    }

    //TODO check om der allerede er booket i tidsrummet
    [Authorize]
    [HttpPost(Name = "CreateBooking")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDTO bookingDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var booking = _mapper.Map<Booking>(bookingDTO);

            _dbContext.Bookings.Add(booking);

            await _dbContext.SaveChangesAsync(ct);

            return NoContent();
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateBooking)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{bookingId}", Name = "GetBooking")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetBooking(string bookingId, CancellationToken ct) {
        var booking = await _dbContext.Bookings.SingleOrDefaultAsync(x => x.BookingId == bookingId, ct);
        if (booking != null) {
            var result = _mapper.Map<BookingDTO>(booking);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet(Name = "GetAllBookings")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetBookings( CancellationToken ct) {
        var bookings = await _dbContext.Bookings.OrderBy(x => x.BookedFrom)
            .ToListAsync(ct);
        
        var results = _mapper.Map<IList<BookingDTO>>(bookings);
        return Ok(results);
    }
}