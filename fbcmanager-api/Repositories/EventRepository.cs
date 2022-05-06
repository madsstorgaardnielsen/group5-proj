using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Repositories;

public class EventRepository : GenericRepository<Event, DatabaseContext> {
    private readonly DatabaseContext _dbContext;

    public EventRepository(DatabaseContext context) : base(context) {
        _dbContext = context;
    }

    public async Task<bool> JoinEvent(string eventId, string userId, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .SingleOrDefaultAsync(x => x.Id == userId, ct);

        var eventEntity = await _dbContext
            .Events
            .Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.Id == eventId, ct);

        if (user != null && eventEntity != null) {
            eventEntity.Participants.Add(user);
            await _dbContext.SaveChangesAsync(ct);
            return true;
        }

        return false;
    }

    public async Task<bool> LeaveEvent(string eventId, string userId, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .SingleOrDefaultAsync(x => x.Id == userId, ct);

        var eventEntity = await _dbContext
            .Events
            .Include(e => e.Participants)
            .SingleOrDefaultAsync(e => e.Id == eventId, ct);

        if (user != null && eventEntity != null) {
            eventEntity.Participants.Remove(user);
            await _dbContext.SaveChangesAsync(ct);
            return true;
        }

        return false;
    }

    public async Task<Event> GetIncludeParticipants(string teamId, CancellationToken ct) {
        var eEvent = await _dbContext
            .Events
            .Where(x => x.Id == teamId)
            .Include(x => x.Participants)
            .SingleOrDefaultAsync(ct);


        return eEvent;
    }
}