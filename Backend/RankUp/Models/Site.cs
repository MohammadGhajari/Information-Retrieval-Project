using System.ComponentModel.DataAnnotations;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace RankUp.Models
{
    public class Site
    {
        [Key]
        public string Domain { get; set; } = string.Empty;
        [Required]
        public string Name { get; set; } = string.Empty;

        [EmailAddress]
        public string email { get; set; } = string.Empty;
    }
}
