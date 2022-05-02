using AutoMapper;
using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Models.DAOs;
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
public class PractiseController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<PractiseController> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _dbCon;

    public PractiseController(IUnitOfWork unitOfWork, ILogger<PractiseController> logger, IMapper mapper,
        DatabaseContext dbCon) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
        _dbCon = dbCon;
    }

    [Authorize]
    [HttpGet("{userId}/all", Name = "GetAllJoinedPractises")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllJoinedPractises(string userId) {
        // var user = await _unitOfWork.Users.Get(u => u.Id == userId);
        var userPractises = await _dbCon.Users.Where(x => x.Id == userId).Include(x => x.Practises).SingleOrDefaultAsync();
        if (userPractises != null) {
            return Ok(userPractises);
        }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("join", Name = "JoinPractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> JoinPractise([FromBody] string practiseId, string userId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _dbCon.Users.FindAsync(userIdFromToken);
        var practise = await _dbCon.Practises.Include(x => x.Participants).SingleOrDefaultAsync();

        if (user != null && practise != null) {
            practise.Participants.Add(user);
            await _dbCon.SaveChangesAsync();
            return NoContent();
        }

        // if (userIdFromToken != userId && User.IsInRole("Admin") != true) {
        //     return BadRequest("Invalid data");
        // }
        //
        // var practise = await _unitOfWork.Practises.Get(p => p.PractiseId == practiseId);
        // var user = await _unitOfWork.Users.Get(u => u.Id == userId);
        // if (practise != null && user != null) {
        //     practise.Participants.Add(user);
        //     await _unitOfWork.Save();
        //     return NoContent();
        // }

        return BadRequest();
    }

    [Authorize]
    [HttpPost("leave", Name = "LeavePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> LeavePractise([FromBody] string practiseId, string userId) {
        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
        var tokenUtils = new TokenUtils();
        var userIdFromToken = tokenUtils.GetUserIdFromToken(token);

        var user = await _dbCon.Users.FindAsync(userIdFromToken);
        var practise = await _dbCon.Practises.Include(x => x.Participants).SingleOrDefaultAsync();

        if (user != null && practise != null) {
            practise.Participants.Remove(user);
            await _dbCon.SaveChangesAsync();
            return NoContent();
        }

        // if (userIdFromToken != userId && User.IsInRole("Admin") != true) {
        //     return BadRequest("Invalid data");
        // }
        //
        // var user = await _unitOfWork.Users.Get(user => user.Id == userId);
        // var team = await _unitOfWork.Practises.Get(u => u.PractiseId == practiseId);
        // if (team != null && user != null && team.Participants.Contains(user)) {
        //     team.Participants.Remove(user);
        //     await _unitOfWork.Save();
        //     return NoContent();
        // }

        return BadRequest();
    }


    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePractise(string id) {
        var practise = await _dbCon.Practises.FindAsync(id);

        if (practise != null) {
            _dbCon.Practises.Remove(practise);
            await _dbCon.SaveChangesAsync();
            return NoContent();
        }

        // var practise = await _unitOfWork.Practises.Get(u => u.PractiseId == id);
        // if (practise != null) {
        //     await _unitOfWork.Practises.Delete(id);
        //     await _unitOfWork.Save();
        //     return NoContent();
        // }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdatePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdatePractise(string id, [FromBody] PractiseDTO practiseDTO) {
        if (ModelState.IsValid) {
            var practise = await _dbCon.Practises.FindAsync(practiseDTO.PractiseId);
            _mapper.Map(practiseDTO, practise);

            if (practise != null) {
                _dbCon.Practises.Update(practise);
                await _dbCon.SaveChangesAsync();
                return NoContent();
            }


            // var practise = await _unitOfWork.Practises.Get(u => u.PractiseId == id);
            //
            // if (practise == null) {
            //     return BadRequest("Invalid data");
            // }
            //
            // _mapper.Map(practiseDTO, practise);
            // _unitOfWork.Practises.Update(practise);
            // await _unitOfWork.Save();
            //
            // return NoContent();
        }

        _logger.LogError($"Error validating data in {nameof(UpdatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreatePractise")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePractise([FromBody] PractiseDTO practiseDTO) {
        if (ModelState.IsValid) {
            var practise = _mapper.Map<Practise>(practiseDTO);

            await _dbCon.Practises.AddAsync(practise);
            await _dbCon.SaveChangesAsync();

            // await _unitOfWork.Practises.Insert(practise);
            // await _unitOfWork.Save();

            var practiseDAO = _mapper.Map<PractiseDAO>(practise);
            return CreatedAtRoute("GetPractise", new {id = practise.PractiseId}, practiseDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreatePractise)}");
        return BadRequest(ModelState);
    }

    [Authorize]
    [HttpGet("{practiseId}", Name = "GetPractise")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractise(string practiseId) {
        // var practise = await _unitOfWork.Practises.Get(u => u.PractiseId == practiseId);
        var practise = await _dbCon.Practises.Where(x => x.PractiseId == practiseId).Include(x => x.Participants)
            .SingleOrDefaultAsync();
        
        if (practise != null) {
            var result = _mapper.Map<PractiseDAO>(practise);
            return Ok(result);
        }

        return NotFound();
    }


    [Authorize]
    [HttpGet(Name = "GetAllPractises")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPractises() {
        var practises = await _unitOfWork.Practises.GetAll();
        var results = _mapper.Map<IList<PractiseDAO>>(practises);
        return Ok(results);
    }
}