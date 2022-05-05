using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Repositories;

public class PractiseRepository : GenericRepository<Practise, DatabaseContext> {
    private readonly DatabaseContext _dbContext;

    public PractiseRepository(DatabaseContext context) : base(context) {
        _dbContext = context;
    }

    public async Task<bool> JoinPractise(string practiseId, string userId, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .SingleOrDefaultAsync(x => x.Id == userId, ct);

        var practise = await _dbContext.Practises.Where(x => x.Id == practiseId)
            .Include(x => x.Participants)
            .SingleOrDefaultAsync(ct);

        if (user != null && practise != null) {
            practise.Participants.Add(user);
            await _dbContext.SaveChangesAsync(ct);
            return true;
        }

        return false;
    }

    public async Task<bool> LeavePractise(string practiseId, string userId, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .SingleOrDefaultAsync(x => x.Id == userId, ct);

        var practise = await _dbContext.Practises.Where(x => x.Id == practiseId)
            .Include(x => x.Participants)
            .SingleOrDefaultAsync(ct);

        if (user != null && practise != null) {
            practise.Participants.Remove(user);
            await _dbContext.SaveChangesAsync(ct);
            return true;
        }

        return false;
    }

    public async Task<List<Practise>> GetAllJoinedPractises(string userId, CancellationToken ct) {
        var user =
            await _dbContext.Users.Where(x => x.Id == userId).Include(x => x.Practises).SingleOrDefaultAsync(ct);

        if (user != null) {
            return user.Practises;
        }

        return null;
    }

    public async Task<Practise> GetIncludeParticipants(string practiseId, CancellationToken ct) {
        var team = await _dbContext
            .Practises
            .Where(x => x.Id == practiseId)
            .Include(x => x.Participants)
            .SingleOrDefaultAsync(ct);


        return team;
    }
}