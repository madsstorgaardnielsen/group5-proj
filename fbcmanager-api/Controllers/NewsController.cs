using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.UnitOfWork;
using fbcmanager_api.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fbcmanager_api.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[Route("api/[controller]")]
[ApiController]
public class NewsController : ControllerBase {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<NewsController> _logger;
    private readonly IMapper _mapper;

    public NewsController(IUnitOfWork unitOfWork, ILogger<NewsController> logger, IMapper mapper) {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
    }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteNews(string id) {
        var news = await _unitOfWork.News.Get(u => u.Id == id);
        if (news != null) {
            await _unitOfWork.News.Delete(id);
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
    public async Task<IActionResult> UpdateNews(string id, [FromBody] NewsDTO newsDTO) {
        if (ModelState.IsValid) {
            var news = await _unitOfWork.News.Get(u => u.Id == id);

            if (news == null) {
                return BadRequest("Invalid data");
            }

            _mapper.Map(newsDTO, news);
            _unitOfWork.News.Update(news);
            await _unitOfWork.Save();

            return NoContent();
        }

        _logger.LogError($"Error validating data in {nameof(UpdateNews)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateNews([FromBody] NewsDTO newsDTO) {
        if (ModelState.IsValid) {
            var news = _mapper.Map<News>(newsDTO);
            await _unitOfWork.News.Insert(news);
            await _unitOfWork.Save();

            var newsDAO = _mapper.Map<NewsDTO>(news);
            return CreatedAtRoute("GetNews", new {id = news.Id}, newsDAO);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateNews)}");
        return BadRequest(ModelState);
    }

   
    [HttpGet("{id}", Name = "GetNews")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNews(string id) {
        var news = await _unitOfWork.News.Get(u => u.Id == id);
        if (news != null) {
            var result = _mapper.Map<NewsDTO>(news);
            return Ok(result);
        }

        return NotFound();
    }

    // [Authorize]
    // [HttpGet("news/paging")]
    // [ProducesResponseType(StatusCodes.Status200OK)]
    // [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    // public async Task<IActionResult> GetNews([FromQuery] HttpRequestParams httpRequestParams) {
    //     var news = await _unitOfWork.News.GetAll(httpRequestParams);
    //     var results = _mapper.Map<IList<NewsDTO>>(news);
    //     return Ok(results);
    // }

   
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNews() {
        var news = await _unitOfWork.News.GetAll();
        var results = _mapper.Map<IList<NewsDTO>>(news);
        return Ok(results);
    }
}