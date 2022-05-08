using fbcmanager_api.Database;
using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Repositories;

public class FieldRepository : GenericRepository<Field, DatabaseContext> {
    public FieldRepository(DatabaseContext context) : base(context) {
    }
}