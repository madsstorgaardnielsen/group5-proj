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
public class NewsController : ControllerBase {
    private readonly ILogger<NewsController> _logger;
    private readonly IMapper _mapper;
    private readonly NewsRepository _newsRepository;

    public NewsController(ILogger<NewsController> logger, IMapper mapper,
        NewsRepository newsRepository) {
        _logger = logger;
        _mapper = mapper;
        _newsRepository = newsRepository;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteNews([FromBody] NewsDTO newsDTO, CancellationToken ct) {
        var result = await _newsRepository.Delete(newsDTO.Id, ct);
        return result ? NoContent() : BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateNews")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsDTO newsDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var news = _mapper.Map<News>(newsDTO);
            var result = await _newsRepository.Update(news, ct);
            if (result != null) {
                var mappedResult = _mapper.Map<NewsDTO>(result);
                return Ok(mappedResult);
            }
        }

        _logger.LogError($"Error validating data in {nameof(UpdateNews)}");
        return BadRequest(ModelState);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost(Name = "CreateNews")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateNews([FromBody] CreateNewsDTO newsDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var news = _mapper.Map<News>(newsDTO);
            var result = await _newsRepository.Create(news, ct);
            var mappedResult = _mapper.Map<NewsDTO>(result);
            return Ok(mappedResult);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateNews)}");
        return BadRequest(ModelState);
    }

    [HttpGet("{newsId}", Name = "GetNews")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNews(string newsId, CancellationToken ct) {
        var news = await _newsRepository.Get(newsId, ct);
        if (news != null) {
            var result = _mapper.Map<NewsDTO>(news);
            return Ok(result);
        }

        return NotFound($"news with id: {newsId} not found");
    }
    
    [HttpGet(Name = "GetAllNews")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNews(CancellationToken ct) {
        var news = await _newsRepository.GetAll(ct);
        var results = _mapper.Map<IList<NewsDTO>>(news).OrderBy(x => x.Date).ToList();
        if (results.Count > 0) {
            return Ok(results);
        }

        return NotFound("No news found");
    }
}