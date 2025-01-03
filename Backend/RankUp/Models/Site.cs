﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Site
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // مقداردهی خودکار توسط دیتابیس
    public int Id { get; set; }

    [Required]
    public string Domain { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
