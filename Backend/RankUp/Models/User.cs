using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RankUp.Models
{
    public class User
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
    }
}
