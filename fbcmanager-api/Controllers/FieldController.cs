using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using fbcmanager_api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class FieldController : ControllerBase {
    private readonly ILogger<FieldController> _logger;
    private readonly IMapper _mapper;
    private readonly FieldRepository _fieldRepository;

    public FieldController(ILogger<FieldController> logger, IMapper mapper,
        FieldRepository fieldRepository) {
        _logger = logger;
        _mapper = mapper;
        _fieldRepository = fieldRepository;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteField([FromBody] FieldDTO fieldDTO, CancellationToken ct) {
        var result = await _fieldRepository.Delete(fieldDTO.Id, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateField")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateField([FromBody] UpdateFieldDTO fieldDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var field = _mapper.Map<Field>(fieldDTO);
            var result = await _fieldRepository.Update(field, ct);
            if (result != null) {
                var mappedResult = _mapper.Map<FieldDTO>(result);
                return Ok(mappedResult);
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdateField)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreateField")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateField([FromBody] CreateFieldDTO fieldDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var field = _mapper.Map<Field>(fieldDTO);
            var result = await _fieldRepository.Create(field, ct);
            var mappedResult = _mapper.Map<FieldDTO>(result);
            return Ok(mappedResult);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateField)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{fieldId}", Name = "GetField")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetField(string fieldId, CancellationToken ct) {
        var field = await _fieldRepository.Get(fieldId, ct);
        if (field != null) {
            var result = _mapper.Map<FieldDTO>(field);
            return Ok(result);
        }

        return NotFound($"field with id: {fieldId} not found");
    }

    [Authorize]
    [HttpGet(Name = "GetAllFields")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFields(CancellationToken ct) {
        var fields = await _fieldRepository.GetAll(ct);
        var results = _mapper.Map<IList<FieldDTO>>(fields).OrderBy(x => x.FieldName).ToList();
        if (results.Count > 0) {
            return Ok(results);
        }

        return NotFound("No fields found");
    }
}