using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.Repositories;

namespace fbcmanager_api.Database.UnitOfWork;

public class UnitOfWork : IUnitOfWork {
    private readonly DatabaseContext _context;
    private IGenericRepository<User> _users;
    private IGenericRepository<Booking> _bookings;
    private IGenericRepository<Event> _events;
    private IGenericRepository<Field> _fields;
    private IGenericRepository<News> _news;
    private IGenericRepository<Practise> _practises;
    private IGenericRepository<Team> _teams;


    public UnitOfWork(DatabaseContext context) {
        _context = context;
    }

    public IGenericRepository<User> Users => _users ??= new GenericRepository<User>(_context);
    public IGenericRepository<Booking> Bookings => _bookings ??= new GenericRepository<Booking>(_context);
    public IGenericRepository<Event> Events => _events ??= new GenericRepository<Event>(_context);
    public IGenericRepository<Field> Fields => _fields ??= new GenericRepository<Field>(_context);
    public IGenericRepository<News> News => _news ??= new GenericRepository<News>(_context);
    public IGenericRepository<Practise> Practises => _practises ??= new GenericRepository<Practise>(_context);
    public IGenericRepository<Team> Teams => _teams ??= new GenericRepository<Team>(_context);


    public async Task Save() {
        await _context.SaveChangesAsync();
    }

    public void Dispose() {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}