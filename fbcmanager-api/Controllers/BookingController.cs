using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Models;
using fbcmanager_api.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<BookingController> _logger;
    private readonly IMapper _mapper;

    public BookingController(IUnitOfWork unitOfWork, ILogger<BookingController> logger, IMapper mapper) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteBooking(string id) {
        var booking = await _unitOfWork.Bookings.Get(u => u.Id == id);
        if (booking != null) {
            await _unitOfWork.Bookings.Delete(id);
            await _unitOfWork.Save();
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateBooking(string id, [FromBody] BookingDTO bookingDTO) {
        if (ModelState.IsValid) {
            var booking = await _unitOfWork.Bookings.Get(u => u.Id == id);

            if (booking == null) {
                return BadRequest("Invalid data");
            }

            _mapper.Map(bookingDTO, booking);
            _unitOfWork.Bookings.Update(booking);
            await _unitOfWork.Save();

            return NoContent();
        }

        _logger.LogError($"Error validating data in {nameof(UpdateBooking)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateBooking([FromBody] BookingDTO bookingDTO) {
        if (ModelState.IsValid) {
            var booking = _mapper.Map<Booking>(bookingDTO);
            await _unitOfWork.Bookings.Insert(booking);
            await _unitOfWork.Save();

            var bookingDAO = _mapper.Map<BookingDTO>(booking);
            return CreatedAtRoute("GetBooking", new {id = booking.Id}, bookingDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateBooking)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{id}", Name = "GetBooking")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetBookings(string id) {
        var booking = await _unitOfWork.Bookings.Get(u => u.Id == id);
        if (booking != null) {
            var result = _mapper.Map<BookingDTO>(booking);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetBookings() {
        var bookings = await _unitOfWork.Bookings.GetAll();
        var results = _mapper.Map<IList<BookingDTO>>(bookings);
        return Ok(results);
    }
}