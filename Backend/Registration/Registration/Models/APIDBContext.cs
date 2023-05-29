using Microsoft.EntityFrameworkCore;
using System;

namespace Registration.Models
{
    public class APIDBContext : DbContext
    {
        public DbSet<ApplicationUser> AspNetUsers { get; set; }
        public DbSet<Wall> Walls { get; set; }
        public DbSet<GroupConnection> GroupConnections { get; set; }
        public DbSet<Term> Terms { get; set; }
        public APIDBContext(DbContextOptions<APIDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder mb)
        {

            base.OnModelCreating(mb);

            mb.Entity<Wall>()
                .Property(x => x.WallID)
                .HasDefaultValueSql("NEWID()")
                ;

            mb.Entity<GroupConnection>()
                .Property(x => x.ConnectionID)
                .HasDefaultValueSql("NEWID()");

            mb.Entity<Term>()
                .Property(x => x.TermID)
                .HasDefaultValueSql("NEWID()");

            mb.Entity<Wall>()
                .HasKey(s => s.WallID);
           
            mb.Entity<Term>()
                .HasKey(s => s.TermID);

            mb.Entity<GroupConnection>()
                .HasKey(s => s.ConnectionID);

            mb.Entity<GroupConnection>()
                .HasOne<Wall>(w => w.Wall)
                .WithMany(g => g.GroupConnections)
                .HasForeignKey(g => g.WallID);

            mb.Entity<Term>()
                .HasOne<GroupConnection>(t => t.GroupConnection)
                .WithMany(g => g.Terms)
                .HasForeignKey(t => t.GroupConnectionID);
        }
    }
}
