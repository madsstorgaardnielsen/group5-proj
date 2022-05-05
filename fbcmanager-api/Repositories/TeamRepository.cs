using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Repositories;

public class TeamRepository : GenericRepository<Team, DatabaseContext> {
    private readonly DatabaseContext _dbContext;

    public TeamRepository(DatabaseContext context) : base(context) {
        _dbContext = context;
    }

    public async Task<bool> JoinTeam(string teamId, string userId, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .Where(x => x.Id == userId)
            .Include(x => x.Team)
            .SingleOrDefaultAsync(ct);

        var team = await _dbContext
            .Teams
            .SingleOrDefaultAsync(x => x.Id == teamId, ct);

        if (team != null && user != null) {
            user.Team = team;
            await _dbContext.SaveChangesAsync(ct);
            return true;
        }

        return false;
    }

    public async Task<bool> LeaveTeam(string teamId, string userId, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .Where(x => x.Id == userId)
            .Include(x => x.Team)
            .SingleOrDefaultAsync(ct);

        var team = await _dbContext
            .Teams
            .SingleOrDefaultAsync(x => x.Id == teamId, ct);

        if (team != null && user != null) {
            user.Team = null;
            await _dbContext.SaveChangesAsync(ct);
            return true;
        }

        return false;
    }

    public async Task<Team> GetIncludeMembers(string teamId, CancellationToken ct) {
        var team = await _dbContext
            .Teams
            .Where(x => x.Id == teamId)
            .Include(x => x.TeamMembers)
            .SingleOrDefaultAsync(ct);


        return team;
    }
}