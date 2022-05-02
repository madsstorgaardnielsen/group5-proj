using fbcmanager_api.Database.Models;

namespace fbcmanager_api.Models.DAOs; 

public class PractiseDAO {
        public string PractiseId { get; set; }
        public Team Team{ get; set; }
        public Field Location { get; set; }
        public DateTime Date{ get; set; }

        public List<User> Participants{ get; set; }

}