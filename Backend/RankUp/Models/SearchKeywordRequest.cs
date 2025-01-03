using System.ComponentModel.DataAnnotations;

namespace RankUp.Models
{
    public class SearchKeywordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string SiteName { get; set; }

        [Required]
        public string SiteDomain { get; set; }

        [Required]
        public string Keyword { get; set; } 
    }
}
