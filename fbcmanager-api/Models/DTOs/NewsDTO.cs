using System.ComponentModel.DataAnnotations;
using fbcmanager_api.Models.DAOs;

namespace fbcmanager_api.Models.DTOs; 

public class NewsDTO {
    [Required]
    public DateOnly Date{ get; set; }
    [Required]
    public string Header{ get; set; }
    [Required]
    public string Subheader{ get; set; }
    [Required]
    public string Content{ get; set; }
    [Required]
    public UserDAO Author{ get; set; }
}