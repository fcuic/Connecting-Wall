﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Registration.Models;

namespace Registration.Migrations.APIDB
{
    [DbContext(typeof(APIDBContext))]
    [Migration("20230526130347_APIDBContextAdd")]
    partial class APIDBContextAdd
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Registration.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(150)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Registration.Models.GroupConnection", b =>
                {
                    b.Property<Guid>("ConnectionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("ConnectionName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("WallID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ConnectionID");

                    b.HasIndex("WallID");

                    b.ToTable("GroupConnections");
                });

            modelBuilder.Entity("Registration.Models.Term", b =>
                {
                    b.Property<Guid>("TermID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid>("GroupConnectionID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("TermName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TermID");

                    b.HasIndex("GroupConnectionID");

                    b.ToTable("Terms");
                });

            modelBuilder.Entity("Registration.Models.Wall", b =>
                {
                    b.Property<Guid>("WallID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateUpdated")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("WallName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("WallID");

                    b.HasIndex("UserID");

                    b.ToTable("Walls");
                });

            modelBuilder.Entity("Registration.Models.GroupConnection", b =>
                {
                    b.HasOne("Registration.Models.Wall", "Wall")
                        .WithMany()
                        .HasForeignKey("WallID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Registration.Models.Term", b =>
                {
                    b.HasOne("Registration.Models.GroupConnection", "GroupConnection")
                        .WithMany("GroupTerms")
                        .HasForeignKey("GroupConnectionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Registration.Models.Wall", b =>
                {
                    b.HasOne("Registration.Models.ApplicationUser", "User")
                        .WithMany("Wall")
                        .HasForeignKey("UserID");
                });
#pragma warning restore 612, 618
        }
    }
}
