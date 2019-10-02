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
  
        public virtual DbSet<CarpentryService> CarpentryService { get; set; }
        public virtual DbSet<CarpentryServiceType> CarpentryServiceType { get; set; }
        public virtual DbSet<Fabric> Fabric { get; set; }
        public virtual DbSet<FabricType> FabricType { get; set; }
        public virtual DbSet<ReferencePicture> ReferencePicture { get; set; }
        public virtual DbSet<Picture> Picture { get; set; }
        public virtual DbSet<Contact> Contact { get; set; }
        public virtual DbSet<Rating> Rating { get; set; }
        public virtual DbSet<OfferRequest> OfferRequest { get; set; }

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
            modelBuilder.Entity<CarpentryServiceType>().HasData
                (
                    new CarpentryServiceType { CarpentryServiceTypeId = 1, Name = "Franciaágyak" },
                    new CarpentryServiceType { CarpentryServiceTypeId = 2, Name = "Heverők" },
                    new CarpentryServiceType { CarpentryServiceTypeId = 3, Name = "Fotelek" },
                    new CarpentryServiceType { CarpentryServiceTypeId = 4, Name = "Kanapék" },
                    new CarpentryServiceType { CarpentryServiceTypeId = 5, Name = "Szék" },
                    new CarpentryServiceType { CarpentryServiceTypeId = 6, Name = "Antik bútorok" },
                    new CarpentryServiceType { CarpentryServiceTypeId = 7, Name = "Autókárpitozás" }
                );

            modelBuilder.Entity<CarpentryService>().HasData
                (
                    new CarpentryService { CarpentryServiceId = 1, Name = "Csak áthúzás, szivacsos", Price = 18000, CarpentryServiceTypeId = 1 },
                    new CarpentryService { CarpentryServiceId = 2, Name = "Csak áthúzás, rugós", Price = 25000, CarpentryServiceTypeId = 1 },
                    new CarpentryService { CarpentryServiceId = 3, Name = "Áthúzás szivacs cserével", Price = 25000, CarpentryServiceTypeId = 1 },
                    new CarpentryService { CarpentryServiceId = 4, Name = "Áthúzás rugó cserével", Price = 31000, CarpentryServiceTypeId = 1 },
                    new CarpentryService { CarpentryServiceId = 5, Name = "Szivacs cserével", Price = 12000, CarpentryServiceTypeId = 2 },
                    new CarpentryService { CarpentryServiceId = 6, Name = "Rugó cserével", Price = 15000, CarpentryServiceTypeId = 2 },
                    new CarpentryService { CarpentryServiceId = 7, Name = "Szivacs- és rugócserével", Price = 20000, CarpentryServiceTypeId = 2 },
                    new CarpentryService { CarpentryServiceId = 8, Name = "Csak áthúzás", Price = 10000, CarpentryServiceTypeId = 3 },
                    new CarpentryService { CarpentryServiceId = 9, Name = "Szivacs- vagy rugócsere", Price = 3000, CarpentryServiceTypeId = 3 },
                    new CarpentryService { CarpentryServiceId = 10, Name = "Csak áthúzás", Price = 15000, CarpentryServiceTypeId = 4 },
                    new CarpentryService { CarpentryServiceId = 11, Name = "Szivacs- vagy rugócsere", Price = 4000, CarpentryServiceTypeId = 4 },
                    new CarpentryService { CarpentryServiceId = 12, Name = "Ülés és támla", Price = 3000, CarpentryServiceTypeId = 5 },
                    new CarpentryService { CarpentryServiceId = 13, Name = "Szivacs cserével", Price = 4500, CarpentryServiceTypeId = 5 },
                    new CarpentryService { CarpentryServiceId = 14, Name = "Látottak alapján", Price = 20000, CarpentryServiceTypeId = 6 },
                    new CarpentryService { CarpentryServiceId = 15, Name = "Látottak alapján", Price = 20000, CarpentryServiceTypeId = 7 }
                );
            modelBuilder.Entity<FabricType>().HasData
                (
                    new FabricType { FabricTypeId = 1, Name = "Textilbőrök" },
                    new FabricType { FabricTypeId = 2, Name = "Síkszövetek" },
                    new FabricType { FabricTypeId = 3, Name = "Vízzel tisztítható bútorszövetek" },
                    new FabricType { FabricTypeId = 4, Name = "Vízlepergető bútorszövetek" },
                    new FabricType { FabricTypeId = 5, Name = "Plüss bútorszövetek" },
                    new FabricType { FabricTypeId = 6, Name = "Matrachuzatok" }
                );
            modelBuilder.Entity<Fabric>().HasData
                (
                    new Fabric { FabricId = 1, Name = "Almara", Price = 2390, FabricTypeId = 1, PictureId = 1 },
                    new Fabric { FabricId = 2, Name = "Bölény", Price = 6760, FabricTypeId = 1, PictureId = 2 },
                    new Fabric { FabricId = 3, Name = "Essenza", Price = 11850, FabricTypeId = 1, PictureId = 3 },
                    new Fabric { FabricId = 4, Name = "Dollár", Price = 2450, FabricTypeId = 1, PictureId = 4 },
                    new Fabric { FabricId = 5, Name = "Sorrento", Price = 5190, FabricTypeId = 1, PictureId = 5 },
                    new Fabric { FabricId = 6, Name = "Artemis", Price = 2980, FabricTypeId = 2, PictureId = 6 },
                    new Fabric { FabricId = 7, Name = "City life", Price = 2450, FabricTypeId = 2, PictureId = 7 },
                    new Fabric { FabricId = 8, Name = "Diana", Price = 10670, FabricTypeId = 2, PictureId = 8 },
                    new Fabric { FabricId = 9, Name = "Astoria", Price = 9230, FabricTypeId = 3, PictureId = 9 },
                    new Fabric { FabricId = 10, Name = "Carabu", Price = 12180, FabricTypeId = 3, PictureId = 10 },
                    new Fabric { FabricId = 11, Name = "Imperia", Price = 5190, FabricTypeId = 3, PictureId = 11 },
                    new Fabric { FabricId = 12, Name = "Infinity", Price = 3990, FabricTypeId = 3, PictureId = 12 },
                    new Fabric { FabricId = 13, Name = "Eerie", Price = 2790, FabricTypeId = 4, PictureId = 13 },
                    new Fabric { FabricId = 14, Name = "Samoa", Price = 2350, FabricTypeId = 4, PictureId = 14 },
                    new Fabric { FabricId = 15, Name = "Tarim", Price = 3140, FabricTypeId = 4, PictureId = 15 },
                    new Fabric { FabricId = 16, Name = "Genezis", Price = 7920, FabricTypeId = 4, PictureId = 16 },
                    new Fabric { FabricId = 17, Name = "Baccara", Price = 5520, FabricTypeId = 5, PictureId = 17 },
                    new Fabric { FabricId = 18, Name = "Fidélió", Price = 7250, FabricTypeId = 5, PictureId = 18 },
                    new Fabric { FabricId = 19, Name = "Genf", Price = 5520, FabricTypeId = 5, PictureId = 19 },
                    new Fabric { FabricId = 20, Name = "Alaska", Price = 1990, FabricTypeId = 6, PictureId = 20 },
                    new Fabric { FabricId = 21, Name = "Galeria 9520", Price = 1790, FabricTypeId = 6, PictureId = 21 },
                    new Fabric { FabricId = 22, Name = "Galeria 9521", Price = 1790, FabricTypeId = 6, PictureId = 22 }
                );
            modelBuilder.Entity<Picture>().HasData
                (
                    new Picture { PictureId = 1, PictureName = "fabric_picture_1.png" },
                    new Picture { PictureId = 2, PictureName = "fabric_picture_2.png" },
                    new Picture { PictureId = 3, PictureName = "fabric_picture_3.png" },
                    new Picture { PictureId = 4, PictureName = "fabric_picture_4.png" },
                    new Picture { PictureId = 5, PictureName = "fabric_picture_5.png" },
                    new Picture { PictureId = 6, PictureName = "fabric_picture_6.png" },
                    new Picture { PictureId = 7, PictureName = "fabric_picture_7.png" },
                    new Picture { PictureId = 8, PictureName = "fabric_picture_8.png" },
                    new Picture { PictureId = 9, PictureName = "fabric_picture_9.png" },
                    new Picture { PictureId = 10, PictureName = "fabric_picture_10.png" },
                    new Picture { PictureId = 11, PictureName = "fabric_picture_11.png" },
                    new Picture { PictureId = 12, PictureName = "fabric_picture_12.png" },
                    new Picture { PictureId = 13, PictureName = "fabric_picture_13.png" },
                    new Picture { PictureId = 14, PictureName = "fabric_picture_14.png" },
                    new Picture { PictureId = 15, PictureName = "fabric_picture_15.png" },
                    new Picture { PictureId = 16, PictureName = "fabric_picture_16.png" },
                    new Picture { PictureId = 17, PictureName = "fabric_picture_17.png" },
                    new Picture { PictureId = 18, PictureName = "fabric_picture_18.png" },
                    new Picture { PictureId = 19, PictureName = "fabric_picture_19.png" },
                    new Picture { PictureId = 20, PictureName = "fabric_picture_20.png" },
                    new Picture { PictureId = 21, PictureName = "fabric_picture_21.png" },
                    new Picture { PictureId = 22, PictureName = "fabric_picture_22.png" },
                    new Picture { PictureId = 23, PictureName = "reference_picture_1.png" },
                    new Picture { PictureId = 24, PictureName = "reference_picture_2.png" },
                    new Picture { PictureId = 25, PictureName = "reference_picture_3.png" },
                    new Picture { PictureId = 26, PictureName = "reference_picture_4.png" },
                    new Picture { PictureId = 27, PictureName = "reference_picture_5.png" },
                    new Picture { PictureId = 28, PictureName = "reference_picture_6.png" },
                    new Picture { PictureId = 29, PictureName = "reference_picture_7.png" },
                    new Picture { PictureId = 30, PictureName = "reference_picture_8.png" },
                    new Picture { PictureId = 31, PictureName = "reference_picture_9.png" },
                    new Picture { PictureId = 32, PictureName = "reference_picture_10.png" },
                    new Picture { PictureId = 33, PictureName = "reference_picture_11.png" }
                );

            modelBuilder.Entity<Rating>().HasData
                (
                    new Rating { RatingId = 1, User = "Szabó Béla", UserRating = "Elégedett", Text = "Minden szuper, csak ajánlani tudom!" },
                    new Rating { RatingId = 2, User = "Tóth János", UserRating = "Nagyon elégedett", Text = "Gyors és hatékony." },
                    new Rating { RatingId = 3, User = "Kovács Ákos", UserRating = "Nagyon elégedett", Text = "Korrekt, szakértő kiszolgálás. Gyors, pontos értékesítés." },
                    new Rating { RatingId = 4, User = "Tibor", UserRating = "Elégedett", Text = "Mindennel meg voltam elégedve" },
                    new Rating { RatingId = 5, User = "István", UserRating = "Közepesen elégedett", Text = "Kicsit lassan zajlott a szolgáltatás véghezvitele, de összességében elfogadható" }
                );
            modelBuilder.Entity<ReferencePicture>().HasData
                (
                    new ReferencePicture { ReferencePictureId = 1, PictureId = 23},
                    new ReferencePicture { ReferencePictureId = 2, PictureId = 24},
                    new ReferencePicture { ReferencePictureId = 3, PictureId = 25},
                    new ReferencePicture { ReferencePictureId = 4, PictureId = 26},
                    new ReferencePicture { ReferencePictureId = 5, PictureId = 27},
                    new ReferencePicture { ReferencePictureId = 6, PictureId = 28},
                    new ReferencePicture { ReferencePictureId = 7, PictureId = 29},
                    new ReferencePicture { ReferencePictureId = 8, PictureId = 30},
                    new ReferencePicture { ReferencePictureId = 9, PictureId = 31},
                    new ReferencePicture { ReferencePictureId = 10, PictureId = 32},
                    new ReferencePicture { ReferencePictureId = 11, PictureId = 33}
                );

            modelBuilder.Entity<Contact>().HasData
                (
                    new Contact { ContactId = 1, Name = "Szabó János", EmailAddress = "szabo.janos@butorkarpitos.hu", Phone = "202-555-0112"},
                    new Contact { ContactId = 2, Name = "Kovács Ákos", EmailAddress = "kovacs.akos@butorkarpitos.hu", Phone = "202-555-0113"},
                    new Contact { ContactId = 3, Name = "Nagy Béla", EmailAddress = "nagy.bela@butorkarpitos.hu", Phone = "202-555-0155"}
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
