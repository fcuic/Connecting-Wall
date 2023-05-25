using Microsoft.EntityFrameworkCore;
using System;

namespace Registration.Models
{
    public class APIDBContext : DbContext
    {
        public DbSet<ApplicationUser> AspNetUsers { get; set; }
        public DbSet<Wall> Walls { get; set; }
        public DbSet<GroupConnections> GroupConnections { get; set; }
        public DbSet<Term> Terms { get; set; }
        public APIDBContext(DbContextOptions<APIDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder mb)
        {

            base.OnModelCreating(mb);
            mb.Entity<Wall>().Property(x => x.wallID).HasDefaultValueSql("NEWID()");
            mb.Entity<Term>().Property(x => x.termID).HasDefaultValueSql("NEWID()");
            mb.Entity<GroupConnections>().Property(x => x.connectionId).HasDefaultValueSql("NEWID()");

            mb.Entity<Wall>()
                .HasKey(s => s.wallID);

            mb.Entity<Term>()
                .HasKey(s => s.termID);

            mb.Entity<GroupConnections>()
                .HasKey(s => s.connectionId);

            mb.Entity<Wall>().HasData(//testing inserting into table
           new Wall() { wallID = Guid.NewGuid(), wallName = "PremierLeague", dateCreated = DateTime.Now },
           new Wall() { wallID = Guid.NewGuid(), wallName = "PremierLeague1", dateCreated = DateTime.Now },
           new Wall() { wallID = Guid.NewGuid(), wallName = "PremierLeague2", dateCreated = DateTime.Now }
           );
        }
    }
}
