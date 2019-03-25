using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CarpentryWebsite.Models;

namespace CarpentryWebsite.Models
{
    public partial class CarpentryWebsiteContext : IdentityDbContext<MyUser>
    {
        public CarpentryWebsiteContext()
        {
        }

        public CarpentryWebsiteContext(DbContextOptions<CarpentryWebsiteContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Favorite> Favorite { get; set; }

        public virtual DbSet<CarpentryService> CarpentryService { get; set; }
        public virtual DbSet<CarpentryServiceType> CarpentryServiceType { get; set; }
        public virtual DbSet<Fabric> Fabric { get; set; }
        public virtual DbSet<FabricType> FabricType { get; set; }
        public virtual DbSet<ReferencePicture> ReferencePicture { get; set; }
        public virtual DbSet<Picture> Picture { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\mssqllocaldb;Initial Catalog=CarpentryWebsite;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.LocationId).HasColumnName("LocationID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
        }
    }
}
