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
            await _dbContext.Users.Where(x => x.Id == userId)
                .Include(x => x.Team)
                .Include(x => x.Practises).SingleOrDefaultAsync(ct);


        var practises = await _dbContext
            .Practises
            .Where(x => x.Participants.Contains(user))
            .Include(x => x.Team)
            .Include(x => x.Field)
            .ToListAsync(ct);

        if (user != null) {
            return practises;
        }

        return null;
    }

    public async Task<List<Practise>> GetAllIncludeAllRelations(CancellationToken ct) {
        var practises = await _dbContext
            .Practises
            .Include(x => x.Team)
            .Include(x => x.Field)
            .ToListAsync(ct);


        return practises;
    }

    public async Task<Practise> GetIncludeAllRelations(string practiseId, CancellationToken ct) {
        var practises = await _dbContext
            .Practises
            .Where(x => x.Id == practiseId)
            .Include(x => x.Participants)
            .Include(x => x.Team)
            .Include(x => x.Field)
            .SingleOrDefaultAsync(ct);


        return practises;
    }
}