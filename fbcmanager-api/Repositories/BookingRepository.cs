using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Repositories;

public class BookingRepository : GenericRepository<Booking, DatabaseContext> {
    private readonly DatabaseContext _dbContext;

    public BookingRepository(DatabaseContext context) : base(context) {
        _dbContext = context;
    }

    public async Task<List<Booking>> GetAllIncludingFieldAndTeam(CancellationToken ct) {
        var bookings = await _dbContext
            .Bookings
            .Include(x => x.Field)
            .Include(x => x.Team)
            .ToListAsync(ct);
        return bookings;
    }

    public async Task<int> UpdateBooking(CancellationToken ct) {
        return await _dbContext.SaveChangesAsync(ct);
    }
}