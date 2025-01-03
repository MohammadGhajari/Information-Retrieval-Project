using RankUp.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class RankResults
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Query { get; set; }

    [Required]
    public string SiteName { get; set; }

    [Required]
    public string SiteDomin { get; set; }

    [Required]
    public int Rank { get; set; }

    [Required]
    public string SuggestedQuery { get; set; } = string.Empty;

    [Required]
    public DateTime CreatedAt { get; set; }
}
