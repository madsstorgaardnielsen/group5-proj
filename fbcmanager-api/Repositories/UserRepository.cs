using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Repositories;

public class UserRepository : GenericRepository<User, DatabaseContext> {
    private readonly DatabaseContext _dbContext;

    public UserRepository(DatabaseContext context) : base(context) {
        _dbContext = context;
    }

    public async Task<User> GetUserByName(string namelike, CancellationToken ct) {
        var user = await _dbContext
            .Users
            .Where(x => x.Firstname.Contains(namelike) || x.Lastname.Contains(namelike))
            .SingleOrDefaultAsync(ct);

        return user;
    }
}