﻿// <auto-generated />
using System;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CarpentryWebsite.Migrations
{
    [DbContext(typeof(CarpentryWebsiteContext))]
    [Migration("20190929211312_Added fabric and services")]
    partial class Addedfabricandservices
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CarpentryWebsite.Models.CarpentryService", b =>
                {
                    b.Property<int>("CarpentryServiceId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CarpentryServiceTypeId");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int?>("PictureId");

                    b.Property<int>("Price");

                    b.HasKey("CarpentryServiceId");

                    b.HasIndex("CarpentryServiceTypeId");

                    b.HasIndex("PictureId");

                    b.ToTable("CarpentryService");

                    b.HasData(
                        new { CarpentryServiceId = 1, CarpentryServiceTypeId = 1, Name = "Csak áthúzás, szivacsos", Price = 18000 },
                        new { CarpentryServiceId = 2, CarpentryServiceTypeId = 1, Name = "Csak áthúzás, rugós", Price = 25000 },
                        new { CarpentryServiceId = 3, CarpentryServiceTypeId = 1, Name = "Áthúzás szivacs cserével", Price = 25000 },
                        new { CarpentryServiceId = 4, CarpentryServiceTypeId = 1, Name = "Áthúzás rugó cserével", Price = 31000 },
                        new { CarpentryServiceId = 5, CarpentryServiceTypeId = 2, Name = "Szivacs cserével", Price = 12000 },
                        new { CarpentryServiceId = 6, CarpentryServiceTypeId = 2, Name = "Rugó cserével", Price = 15000 },
                        new { CarpentryServiceId = 7, CarpentryServiceTypeId = 2, Name = "Szivacs- és rugócserével", Price = 20000 },
                        new { CarpentryServiceId = 8, CarpentryServiceTypeId = 3, Name = "Csak áthúzás", Price = 10000 },
                        new { CarpentryServiceId = 9, CarpentryServiceTypeId = 3, Name = "Szivacs- vagy rugócsere", Price = 3000 },
                        new { CarpentryServiceId = 10, CarpentryServiceTypeId = 4, Name = "Csak áthúzás", Price = 15000 },
                        new { CarpentryServiceId = 11, CarpentryServiceTypeId = 4, Name = "Szivacs- vagy rugócsere", Price = 4000 },
                        new { CarpentryServiceId = 12, CarpentryServiceTypeId = 5, Name = "Ülés és támla", Price = 3000 },
                        new { CarpentryServiceId = 13, CarpentryServiceTypeId = 5, Name = "Szivacs cserével", Price = 4500 },
                        new { CarpentryServiceId = 14, CarpentryServiceTypeId = 6, Name = "Látottak alapján", Price = 20000 },
                        new { CarpentryServiceId = 15, CarpentryServiceTypeId = 7, Name = "Látottak alapján", Price = 20000 }
                    );
                });

            modelBuilder.Entity("CarpentryWebsite.Models.CarpentryServiceType", b =>
                {
                    b.Property<int>("CarpentryServiceTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("CarpentryServiceTypeId");

                    b.ToTable("CarpentryServiceType");

                    b.HasData(
                        new { CarpentryServiceTypeId = 1, Name = "Franciaágyak" },
                        new { CarpentryServiceTypeId = 2, Name = "Heverők" },
                        new { CarpentryServiceTypeId = 3, Name = "Fotelek" },
                        new { CarpentryServiceTypeId = 4, Name = "Kanapék" },
                        new { CarpentryServiceTypeId = 5, Name = "Szék" },
                        new { CarpentryServiceTypeId = 6, Name = "Antik bútorok" },
                        new { CarpentryServiceTypeId = 7, Name = "Autókárpitozás" }
                    );
                });

            modelBuilder.Entity("CarpentryWebsite.Models.Contact", b =>
                {
                    b.Property<int>("ContactId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EmailAddress");

                    b.Property<string>("Name");

                    b.Property<string>("Phone");

                    b.HasKey("ContactId");

                    b.ToTable("Contact");
                });

            modelBuilder.Entity("CarpentryWebsite.Models.Fabric", b =>
                {
                    b.Property<int>("FabricId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FabricTypeId");

                    b.Property<string>("Name");

                    b.Property<int>("PictureId");

                    b.Property<int>("Price");

                    b.HasKey("FabricId");

                    b.HasIndex("FabricTypeId");

                    b.HasIndex("PictureId");

                    b.ToTable("Fabric");

                    b.HasData(
                        new { FabricId = 1, FabricTypeId = 1, Name = "Almara", PictureId = 1, Price = 2390 },
                        new { FabricId = 2, FabricTypeId = 1, Name = "Bölény", PictureId = 2, Price = 6760 },
                        new { FabricId = 3, FabricTypeId = 1, Name = "Essenza", PictureId = 3, Price = 11850 },
                        new { FabricId = 4, FabricTypeId = 1, Name = "Dollár", PictureId = 4, Price = 2450 },
                        new { FabricId = 5, FabricTypeId = 1, Name = "Sorrento", PictureId = 5, Price = 5190 },
                        new { FabricId = 6, FabricTypeId = 2, Name = "Artemis", PictureId = 6, Price = 2980 },
                        new { FabricId = 7, FabricTypeId = 2, Name = "City life", PictureId = 7, Price = 2450 },
                        new { FabricId = 8, FabricTypeId = 2, Name = "Diana", PictureId = 8, Price = 10670 },
                        new { FabricId = 9, FabricTypeId = 3, Name = "Astoria", PictureId = 9, Price = 9230 },
                        new { FabricId = 10, FabricTypeId = 3, Name = "Carabu", PictureId = 10, Price = 12180 },
                        new { FabricId = 11, FabricTypeId = 3, Name = "Imperia", PictureId = 11, Price = 5190 },
                        new { FabricId = 12, FabricTypeId = 3, Name = "Infinity", PictureId = 12, Price = 3990 },
                        new { FabricId = 13, FabricTypeId = 4, Name = "Eerie", PictureId = 13, Price = 2790 },
                        new { FabricId = 14, FabricTypeId = 4, Name = "Samoa", PictureId = 14, Price = 2350 },
                        new { FabricId = 15, FabricTypeId = 4, Name = "Tarim", PictureId = 15, Price = 3140 },
                        new { FabricId = 16, FabricTypeId = 4, Name = "Genezis", PictureId = 16, Price = 7920 },
                        new { FabricId = 17, FabricTypeId = 5, Name = "Baccara", PictureId = 17, Price = 5520 },
                        new { FabricId = 18, FabricTypeId = 5, Name = "Fidélió", PictureId = 18, Price = 7250 },
                        new { FabricId = 19, FabricTypeId = 5, Name = "Genf", PictureId = 19, Price = 5520 },
                        new { FabricId = 20, FabricTypeId = 6, Name = "Alaska", PictureId = 20, Price = 1990 },
                        new { FabricId = 21, FabricTypeId = 6, Name = "Galeria 9520", PictureId = 21, Price = 1790 },
                        new { FabricId = 22, FabricTypeId = 6, Name = "Galeria 9521", PictureId = 22, Price = 1790 }
                    );
                });

            modelBuilder.Entity("CarpentryWebsite.Models.FabricType", b =>
                {
                    b.Property<int>("FabricTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("FabricTypeId");

                    b.ToTable("FabricType");

                    b.HasData(
                        new { FabricTypeId = 1, Name = "Textilbőrök" },
                        new { FabricTypeId = 2, Name = "Síkszövetek" },
                        new { FabricTypeId = 3, Name = "Vízzel tisztítható bútorszövetek" },
                        new { FabricTypeId = 4, Name = "Vízlepergető bútorszövetek" },
                        new { FabricTypeId = 5, Name = "Plüss bútorszövetek" },
                        new { FabricTypeId = 6, Name = "Matrachuzatok" }
                    );
                });

            modelBuilder.Entity("CarpentryWebsite.Models.MyUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.Property<bool>("isAdmin");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("CarpentryWebsite.Models.OfferRequest", b =>
                {
                    b.Property<int>("OfferRequestId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EmailAddress");

                    b.Property<string>("Message");

                    b.Property<string>("Name");

                    b.Property<int?>("PictureId");

                    b.HasKey("OfferRequestId");

                    b.HasIndex("PictureId");

                    b.ToTable("OfferRequest");
                });

            modelBuilder.Entity("CarpentryWebsite.Models.Picture", b =>
                {
                    b.Property<int>("PictureId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PictureName");

                    b.Property<string>("PictureUrl");

                    b.HasKey("PictureId");

                    b.ToTable("Picture");

                    b.HasData(
                        new { PictureId = 1, PictureName = "fabric_picture_1.png" },
                        new { PictureId = 2, PictureName = "fabric_picture_2.png" },
                        new { PictureId = 3, PictureName = "fabric_picture_3.png" },
                        new { PictureId = 4, PictureName = "fabric_picture_4.png" },
                        new { PictureId = 5, PictureName = "fabric_picture_5.png" },
                        new { PictureId = 6, PictureName = "fabric_picture_6.png" },
                        new { PictureId = 7, PictureName = "fabric_picture_7.png" },
                        new { PictureId = 8, PictureName = "fabric_picture_8.png" },
                        new { PictureId = 9, PictureName = "fabric_picture_9.png" },
                        new { PictureId = 10, PictureName = "fabric_picture_10.png" },
                        new { PictureId = 11, PictureName = "fabric_picture_11.png" },
                        new { PictureId = 12, PictureName = "fabric_picture_12.png" },
                        new { PictureId = 13, PictureName = "fabric_picture_13.png" },
                        new { PictureId = 14, PictureName = "fabric_picture_14.png" },
                        new { PictureId = 15, PictureName = "fabric_picture_15.png" },
                        new { PictureId = 16, PictureName = "fabric_picture_16.png" },
                        new { PictureId = 17, PictureName = "fabric_picture_17.png" },
                        new { PictureId = 18, PictureName = "fabric_picture_18.png" },
                        new { PictureId = 19, PictureName = "fabric_picture_19.png" },
                        new { PictureId = 20, PictureName = "fabric_picture_20.png" },
                        new { PictureId = 21, PictureName = "fabric_picture_21.png" },
                        new { PictureId = 22, PictureName = "fabric_picture_22.png" }
                    );
                });

            modelBuilder.Entity("CarpentryWebsite.Models.Rating", b =>
                {
                    b.Property<int>("RatingId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Text");

                    b.Property<string>("User");

                    b.Property<string>("UserRating");

                    b.HasKey("RatingId");

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("CarpentryWebsite.Models.ReferencePicture", b =>
                {
                    b.Property<int>("ReferencePictureId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PictureId");

                    b.HasKey("ReferencePictureId");

                    b.HasIndex("PictureId");

                    b.ToTable("ReferencePicture");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasMaxLength(128);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("CarpentryWebsite.Models.CarpentryService", b =>
                {
                    b.HasOne("CarpentryWebsite.Models.CarpentryServiceType", "CarpentryServiceType")
                        .WithMany("CarpentryServices")
                        .HasForeignKey("CarpentryServiceTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarpentryWebsite.Models.Picture", "Picture")
                        .WithMany("CarpentryServices")
                        .HasForeignKey("PictureId");
                });

            modelBuilder.Entity("CarpentryWebsite.Models.Fabric", b =>
                {
                    b.HasOne("CarpentryWebsite.Models.FabricType", "FabricType")
                        .WithMany("Fabrics")
                        .HasForeignKey("FabricTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarpentryWebsite.Models.Picture", "Picture")
                        .WithMany("Fabrics")
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarpentryWebsite.Models.OfferRequest", b =>
                {
                    b.HasOne("CarpentryWebsite.Models.Picture", "Picture")
                        .WithMany("OfferRequests")
                        .HasForeignKey("PictureId");
                });

            modelBuilder.Entity("CarpentryWebsite.Models.ReferencePicture", b =>
                {
                    b.HasOne("CarpentryWebsite.Models.Picture", "Picture")
                        .WithMany("ReferencePictures")
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("CarpentryWebsite.Models.MyUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("CarpentryWebsite.Models.MyUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarpentryWebsite.Models.MyUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("CarpentryWebsite.Models.MyUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
