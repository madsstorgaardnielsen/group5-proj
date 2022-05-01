using System.Linq.Expressions;
using fbcmanager_api.Models;
using X.PagedList;

namespace fbcmanager_api.Database.Repositories;

public interface IGenericRepository<T> where T : class {
    Task<IList<T>> GetAll(
        Expression<Func<T, bool>> expression = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        List<string> includes = null
    );

    Task<IPagedList<T>> GetAll(HttpRequestParams httpRequestParams, List<string> includes = null);

    Task<T> Get(Expression<Func<T, bool>> expression, List<string> includes = null);

    Task Insert(T entity);

    Task Delete(string id);

    void Update(T entity);
}