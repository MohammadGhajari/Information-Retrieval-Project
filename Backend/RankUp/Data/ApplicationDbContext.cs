using RankUp.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RankUp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Site> Sites { get; set; }
        public DbSet<Keyword> Keywords { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
