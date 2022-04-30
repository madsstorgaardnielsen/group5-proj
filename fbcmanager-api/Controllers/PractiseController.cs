using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Models.DAOs;
using fbcmanager_api.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class PractiseController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<PractiseController> _logger;
    private readonly IMapper _mapper;

    public PractiseController(IUnitOfWork unitOfWork, ILogger<PractiseController> logger, IMapper mapper) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePractise(string id) {
        var practise = await _unitOfWork.Practises.Get(u => u.Id == id);
        if (practise != null) {
            await _unitOfWork.Practises.Delete(id);
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
    public async Task<IActionResult> UpdatePractise(string id, [FromBody] PractiseDTO practiseDTO) {
        if (ModelState.IsValid) {
            var practise = await _unitOfWork.Practises.Get(u => u.Id == id);

            if (practise == null) {
                return BadRequest("Invalid data");
            }

            _mapper.Map(practiseDTO, practise);
            _unitOfWork.Practises.Update(practise);
            await _unitOfWork.Save();

            return NoContent();
        }

        _logger.LogError($"Error validating data in {nameof(UpdatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePractise([FromBody] PractiseDTO practiseDTO) {
        if (ModelState.IsValid) {
            var practise = _mapper.Map<Practise>(practiseDTO);
            await _unitOfWork.Practises.Insert(practise);
            await _unitOfWork.Save();

            var practiseDAO = _mapper.Map<PractiseDAO>(practise);
            return CreatedAtRoute("GetPractise", new {id = practise.Id}, practiseDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{id}", Name = "GetPractise")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractise(string id) {
        var practise = await _unitOfWork.Practises.Get(u => u.Id == id);
        if (practise != null) {
            var result = _mapper.Map<PractiseDAO>(practise);
            return Ok(result);
        }

        return NotFound();
    }

    // [Authorize]
    // [HttpGet("practises/paging")]
    // [ProducesResponseType(StatusCodes.Status200OK)]
    // [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    // public async Task<IActionResult> GetPractises([FromQuery] HttpRequestParams httpRequestParams) {
    //     var practises = await _unitOfWork.Practises.GetAll(httpRequestParams);
    //     var results = _mapper.Map<IList<PractiseDAO>>(practises);
    //     return Ok(results);
    // }

    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractises() {
        var practises = await _unitOfWork.Practises.GetAll();
        var results = _mapper.Map<IList<PractiseDAO>>(practises);
        return Ok(results);
    }
}