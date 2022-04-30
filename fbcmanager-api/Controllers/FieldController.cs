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
public class FieldController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<FieldController> _logger;
    private readonly IMapper _mapper;

    public FieldController(IUnitOfWork unitOfWork, ILogger<FieldController> logger, IMapper mapper) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteField(string id) {
        var field = await _unitOfWork.Fields.Get(u => u.Id == id);
        if (field != null) {
            await _unitOfWork.Fields.Delete(id);
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
    public async Task<IActionResult> UpdateField(string id, [FromBody] FieldDTO fieldDTO) {
        if (ModelState.IsValid) {
            var field = await _unitOfWork.Fields.Get(u => u.Id == id);

            if (field == null) {
                return BadRequest("Invalid data");
            }

            _mapper.Map(fieldDTO, field);
            _unitOfWork.Fields.Update(field);
            await _unitOfWork.Save();

            return NoContent();
        }

        _logger.LogError($"Error validating data in {nameof(UpdateField)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateField([FromBody] FieldDTO fieldDTO) {
        if (ModelState.IsValid) {
            var field = _mapper.Map<Field>(fieldDTO);
            await _unitOfWork.Fields.Insert(field);
            await _unitOfWork.Save();

            var fieldDAO = _mapper.Map<FieldDTO>(field);
            return CreatedAtRoute("GetField", new {id = field.Id}, fieldDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateField)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{id}", Name = "GetField")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetField(string id) {
        var field = await _unitOfWork.Fields.Get(u => u.Id == id);
        if (field != null) {
            var result = _mapper.Map<FieldDTO>(field);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFields() {
        var field = await _unitOfWork.Fields.GetAll();
        var results = _mapper.Map<IList<FieldDTO>>(field);
        return Ok(results);
    }
}