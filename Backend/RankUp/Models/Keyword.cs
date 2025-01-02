using System.ComponentModel.DataAnnotations;

namespace RankUp.Models
{
    public class Keyword
    {
        [Key]
        public string Name { get; set; } = string.Empty;

        [EmailAddress]
        public string email { get; set; }
    }
}

