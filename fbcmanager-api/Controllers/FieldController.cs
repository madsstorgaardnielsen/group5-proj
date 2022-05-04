using AutoMapper;
using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class FieldController : ControllerBase {
    private readonly ILogger<FieldController> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _dbContext;

    public FieldController(ILogger<FieldController> logger, IMapper mapper,
        DatabaseContext dbContext) {
        _logger = logger;
        _mapper = mapper;
        _dbContext = dbContext;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteField([FromBody] FieldDTO fieldDTO, CancellationToken ct) {
        var field = await _dbContext.Fields.SingleOrDefaultAsync(x => x.FieldId == fieldDTO.FieldId, ct);
        if (field != null) {
            _dbContext.Fields.Remove(field);
            await _dbContext.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateField")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateField([FromBody] UpdateFieldDTO fieldDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var field = await _dbContext.Fields.SingleOrDefaultAsync(x => x.FieldId == fieldDTO.FieldId, ct);
            if (field != null) {
                _mapper.Map(fieldDTO, field);
                _dbContext.Fields.Update(field);
                await _dbContext.SaveChangesAsync(ct);
                return Accepted(fieldDTO);
            }

            return BadRequest("Invalid data");
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
            _dbContext.Fields.Add(field);
            await _dbContext.SaveChangesAsync(ct);

            var result = _mapper.Map<FieldDTO>(field);
            return Ok(result);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateField)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{fieldId}", Name = "GetField")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetField(string fieldId, CancellationToken ct) {
        var field = await _dbContext.Fields.SingleOrDefaultAsync(x => x.FieldId == fieldId, ct);
        if (field != null) {
            var result = _mapper.Map<FieldDTO>(field);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet(Name = "GetAllFields")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFields(CancellationToken ct) {
        var fields = await _dbContext.Fields.OrderBy(x => x.FieldName).ToListAsync(ct);
        var results = _mapper.Map<IList<FieldDTO>>(fields);
        return Ok(results);
    }
}