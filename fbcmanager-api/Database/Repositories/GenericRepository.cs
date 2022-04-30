using System.Linq.Expressions;
using fbcmanager_api.Models;
using Microsoft.EntityFrameworkCore;
using X.PagedList;

namespace fbcmanager_api.Database.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class {
    private readonly DatabaseContext _context;
    private readonly DbSet<T> _db;

    public GenericRepository(DatabaseContext context) {
        _context = context;
        _db = _context.Set<T>();
    }

    public async Task<IList<T>> GetAll(Expression<Func<T, bool>> expression = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<string> includes = null) {
        IQueryable<T> query = _db;
        if (expression != null) {
            query = query.Where(expression);
        }

        if (includes != null) {
            query = includes
                .Aggregate(query, (current, property) => current.Include(property));
        }

        if (orderBy != null) {
            query = orderBy(query);
        }

        return await query.AsNoTracking().ToListAsync();
    }

    public async Task<IPagedList<T>> GetAll(HttpRequestParams httpRequestParams, List<string> includes = null) {
        IQueryable<T> query = _db;

        if (includes != null) {
            query = includes
                .Aggregate(query, (current, property) => current.Include(property));
        }

        return await query.AsNoTracking().ToPagedListAsync(httpRequestParams.PageNumber, httpRequestParams.PageSize);
    }


    public async Task<T> Get(Expression<Func<T, bool>> expression, List<string> includes = null) {
        IQueryable<T> query = _db;
        if (includes != null) {
            query = includes
                .Aggregate(query, (current, property) => current.Include(property));
        }

        return await query.AsNoTracking().FirstOrDefaultAsync(expression);
    }

    public async Task Insert(T entity) {
        await _db.AddAsync(entity);
    }

    public async Task Delete(string id) {
        var entity = await _db.FindAsync(id);
        if (entity != null) {
            _db.Remove(entity);
        }
    }

    public void Update(T entity) {
        _db.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }
}