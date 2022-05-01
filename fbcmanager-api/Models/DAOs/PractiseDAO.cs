using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DAOs; 

public class PractiseDAO {
        public Team Team{ get; set; }
        public Field Location { get; set; }
        public DateOnly Date{ get; set; }
        public TimeOnly From{ get; set; }
        public TimeOnly To { get; set; }
        public List<User> Participants{ get; set; }

}