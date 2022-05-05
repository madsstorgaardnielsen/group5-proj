using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Repositories;

public class NewsRepository : GenericRepository<News, DatabaseContext> {
    public NewsRepository(DatabaseContext context) : base(context) {
    }
}