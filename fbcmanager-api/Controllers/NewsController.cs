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
public class NewsController : ControllerBase {
    private readonly ILogger<NewsController> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _dbContext;

    public NewsController(ILogger<NewsController> logger, IMapper mapper,
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
    public async Task<IActionResult> DeleteNews([FromBody]NewsDTO newsDTO, CancellationToken ct) {
        var news = await _dbContext.News.SingleOrDefaultAsync(x => x.NewsId == newsDTO.NewsId, ct);

        if (news != null) {
            _dbContext.News.Remove(news);
            await _dbContext.SaveChangesAsync(ct);
            return NoContent();
        }

        return BadRequest();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut(Name = "UpdateNews")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsDTO newsDTO, CancellationToken ct) {
        if (ModelState.IsValid) {
            var news = await _dbContext.News.SingleOrDefaultAsync(x => x.NewsId == newsDTO.NewsId, ct);

            if (news == null) {
                return BadRequest("Invalid data");
            }

            _mapper.Map(newsDTO, news);
            _dbContext.News.Update(news);
            await _dbContext.SaveChangesAsync(ct);

            return NoContent();
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
            _dbContext.News.Add(news);
            await _dbContext.SaveChangesAsync(ct);

            var result = _mapper.Map<NewsDTO>(news);
            return Ok(result);
        }

        _logger.LogInformation($"Invalid POST in {nameof(CreateNews)}");
        return BadRequest(ModelState);
    }


    [HttpGet("{newsId}", Name = "GetNews")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNews(string newsId, CancellationToken ct) {
        var news = await _dbContext.News.SingleOrDefaultAsync(x => x.NewsId == newsId, ct);
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


    [HttpGet(Name = "GetAllNews")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetNews(CancellationToken ct) {
        var news = await _dbContext.News.OrderBy(x => x.Date).ToListAsync(ct);
        var results = _mapper.Map<IList<NewsDTO>>(news);
        return Ok(results);
    }
}