using System.ComponentModel.DataAnnotations;

public class SiteDto
{
    [Required]
    public string Domain { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
