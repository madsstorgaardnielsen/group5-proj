using fbcmanager_api.Database.Models;
using fbcmanager_api.Database.Repositories;

namespace fbcmanager_api.Database.UnitOfWork;

public interface IUnitOfWork : IDisposable {
    IGenericRepository<User> Users { get; }
    IGenericRepository<Booking> Bookings { get; }
    IGenericRepository<Event> Events { get; }
    IGenericRepository<Field> Fields { get; }
    IGenericRepository<News> News { get; }
    IGenericRepository<Practise> Practises { get; }
    IGenericRepository<Team> Teams { get; }
    Task Save();
}