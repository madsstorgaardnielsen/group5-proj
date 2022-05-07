using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Repositories;

public interface IGenericRepository<T> where T : class, IEntity {
    Task<List<T>> GetAll(CancellationToken ct);
    Task<T> Get(string id, CancellationToken ct);
    Task<T> Create(T entity, CancellationToken ct);
    Task<T> Update(T entity, CancellationToken ct);
    Task<bool> Delete(string id, CancellationToken ct);
}