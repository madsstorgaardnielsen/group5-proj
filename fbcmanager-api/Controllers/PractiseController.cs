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
public class PractiseController : ControllerBase {
    private readonly ILogger<PractiseController> _logger;
    private readonly IMapper _mapper;
    private readonly PractiseRepository _practiseRepository;

    private readonly TokenUtils _tokenUtils;

    public PractiseController(IMapper mapper, PractiseRepository practiseRepository, TokenUtils tokenUtils,
        ILogger<PractiseController> logger) {
        _logger = logger;
        _mapper = mapper;
        _practiseRepository = practiseRepository;
        _tokenUtils = tokenUtils;
    }


    [Authorize]
    [HttpGet("joined", Name = "GetAllJoinedPractises")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllJoinedPractises(CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var joinedPractises = await _practiseRepository.GetAllJoinedPractises(userIdFromToken, ct);

        if (joinedPractises != null) {
            var mappedPractises = _mapper.Map<IList<PractiseDTO>>(joinedPractises);
            return Ok(mappedPractises);
        }

        return NotFound("User has no joined practises");
    }

    [Authorize]
    [HttpPost("join", Name = "JoinPractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinPractise([FromBody] PractiseDTO practiseDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var result = await _practiseRepository.JoinPractise(practiseDTO.Id, userIdFromToken, ct);
        return result ? NoContent() : NotFound($"practise with id: {practiseDTO.Id} not found");
    }

    [Authorize]
    [HttpPost("leave", Name = "LeavePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeavePractise([FromBody] PractiseDTO practiseDTO, CancellationToken ct) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var userIdFromToken = _tokenUtils.GetUserIdFromToken(token);
        var result = await _practiseRepository.LeavePractise(practiseDTO.Id, userIdFromToken, ct);
        return result ? NoContent() : NotFound($"practise with id: {practiseDTO.Id} not found");
    }


    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePractise([FromBody] PractiseDTO practiseDTO, CancellationToken ct) {
        var result = await _practiseRepository.Delete(practiseDTO.Id, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdatePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdatePractise([FromBody] UpdatePractiseDTO practiseDTO,
        CancellationToken ct) {
        if (ModelState.IsValid) {
            var practice = _mapper.Map<Practise>(practiseDTO);
            var result = await _practiseRepository.Update(practice, ct);

            if (result != null) {
                var updatedPractise = _mapper.Map<PractiseDTO>(result);
                return Ok(updatedPractise);
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreatePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePractise([FromBody] CreatePractiseDTO practiseDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var practise = _mapper.Map<Practise>(practiseDTO);
            var result = await _practiseRepository.Create(practise, ct);
            var mappedResult = _mapper.Map<PractiseDTO>(result);
            return Ok(mappedResult);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{practiseId}", Name = "GetPractise")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractise(string practiseId, CancellationToken ct) {
        var practise = await _practiseRepository.GetIncludeAllRelations(practiseId, ct);

        if (practise != null) {
            var result = _mapper.Map<PractiseDTO>(practise);
            return Ok(result);
        }

        return NotFound($"practise with id: {practiseId} not found");
    }


    [Authorize]
    [HttpGet(Name = "GetAllPractises")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractises(CancellationToken ct) {
        var practises = await _practiseRepository.GetAllIncludeAllRelations(ct);

        var results = _mapper.Map<IList<PractiseDTO>>(practises).OrderBy(x => x.Date).ToList();
        if (results.Count > 0) {
            return Ok(results);
        }

        return NotFound("No practises found");
    }
}