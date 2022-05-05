using fbcmanager_api.Controllers;
using fbcmanager_api.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace fbcmanager_api.Repositories;

public abstract class GenericRepository<TEntity, TContext> : IGenericRepository<TEntity>
    where TEntity : class, IEntity
    where TContext : DbContext {
    private readonly TContext _context;

    protected GenericRepository(TContext context) {
        _context = context;
    }

    public async Task<TEntity> Create(TEntity entity, CancellationToken ct) {
        _context.Set<TEntity>().Add(entity);
        await _context.SaveChangesAsync(ct);
        return entity;
    }

    public async Task<bool> Delete(string id, CancellationToken ct) {
        var entity = await _context.Set<TEntity>().SingleOrDefaultAsync(x => x.Id == id, ct);
        if (entity != null) {
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync(ct);
            return true;
        }

        return false;
    }

    public async Task<TEntity> Get(string id, CancellationToken ct) {
        return await _context.Set<TEntity>().SingleOrDefaultAsync(x => x.Id == id, ct);
    }

    public async Task<List<TEntity>> GetAll(CancellationToken ct) {
        return await _context.Set<TEntity>().ToListAsync(ct);
    }

    public async Task<TEntity> Update(TEntity entity, CancellationToken ct) {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(ct);
        return entity;
    }
}