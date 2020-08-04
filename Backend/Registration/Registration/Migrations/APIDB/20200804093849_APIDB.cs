using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Registration.Models;

namespace Registration.Migrations.APIDB
{
    public partial class APIDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(150)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });*/

            migrationBuilder.CreateTable(
                name: "Walls",
                columns: table => new
                {
                    wallID = table.Column<Guid>(nullable: false, defaultValueSql: "NEWID()"),
                    wallName = table.Column<string>(nullable: false),
                    dateCreated = table.Column<DateTime>(nullable: false),
                    dateUpdated = table.Column<DateTime>(nullable: true),
                    userID = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Walls", x => x.wallID);
                    table.ForeignKey(
                        name: "FK_Walls_AspNetUsers_userID",
                        column: x => x.userID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GroupConnections",
                columns: table => new
                {
                    connectionId = table.Column<Guid>(nullable: false, defaultValueSql: "NEWID()"),
                    connectionName = table.Column<string>(nullable: true),
                    wallID = table.Column<Guid>(nullable: true),
                    wallID1 = table.Column<Guid>(nullable: true),
                    wallID2 = table.Column<Guid>(nullable: true),
                    wallID3 = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupConnections", x => x.connectionId);
                    table.ForeignKey(
                        name: "FK_GroupConnections_Walls_wallID",
                        column: x => x.wallID,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupConnections_Walls_wallID1",
                        column: x => x.wallID1,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupConnections_Walls_wallID2",
                        column: x => x.wallID2,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupConnections_Walls_wallID3",
                        column: x => x.wallID3,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Terms",
                columns: table => new
                {
                    termID = table.Column<Guid>(nullable: false, defaultValueSql: "NEWID()"),
                    termName = table.Column<string>(nullable: true),
                    wallID = table.Column<Guid>(nullable: true),
                    wallID1 = table.Column<Guid>(nullable: true),
                    wallID2 = table.Column<Guid>(nullable: true),
                    wallID3 = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terms", x => x.termID);
                    table.ForeignKey(
                        name: "FK_Terms_Walls_wallID",
                        column: x => x.wallID,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Terms_Walls_wallID1",
                        column: x => x.wallID1,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Terms_Walls_wallID2",
                        column: x => x.wallID2,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Terms_Walls_wallID3",
                        column: x => x.wallID3,
                        principalTable: "Walls",
                        principalColumn: "wallID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Walls",
                columns: new[] { "wallID", "dateCreated", "dateUpdated", "userID", "wallName" },
                values: new object[] { new Guid("1abe31c0-7deb-46e8-8edc-6ff84100805e"), new DateTime(2020, 8, 4, 11, 38, 48, 488, DateTimeKind.Local).AddTicks(2438), null, null, "PremierLeague" });

            migrationBuilder.InsertData(
                table: "Walls",
                columns: new[] { "wallID", "dateCreated", "dateUpdated", "userID", "wallName" },
                values: new object[] { new Guid("57bd1a53-bcbc-436d-aa88-97af5b18f52d"), new DateTime(2020, 8, 4, 11, 38, 48, 488, DateTimeKind.Local).AddTicks(3674), null, null, "PremierLeague1" });

            migrationBuilder.InsertData(
                table: "Walls",
                columns: new[] { "wallID", "dateCreated", "dateUpdated", "userID", "wallName" },
                values: new object[] { new Guid("16579944-1c26-45ea-8465-4ff4dadc6a8b"), new DateTime(2020, 8, 4, 11, 38, 48, 488, DateTimeKind.Local).AddTicks(3700), null, null, "PremierLeague2" });

            migrationBuilder.CreateIndex(
                name: "IX_GroupConnections_wallID",
                table: "GroupConnections",
                column: "wallID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupConnections_wallID1",
                table: "GroupConnections",
                column: "wallID1");

            migrationBuilder.CreateIndex(
                name: "IX_GroupConnections_wallID2",
                table: "GroupConnections",
                column: "wallID2");

            migrationBuilder.CreateIndex(
                name: "IX_GroupConnections_wallID3",
                table: "GroupConnections",
                column: "wallID3");

            migrationBuilder.CreateIndex(
                name: "IX_Terms_wallID",
                table: "Terms",
                column: "wallID");

            migrationBuilder.CreateIndex(
                name: "IX_Terms_wallID1",
                table: "Terms",
                column: "wallID1");

            migrationBuilder.CreateIndex(
                name: "IX_Terms_wallID2",
                table: "Terms",
                column: "wallID2");

            migrationBuilder.CreateIndex(
                name: "IX_Terms_wallID3",
                table: "Terms",
                column: "wallID3");

            migrationBuilder.CreateIndex(
                name: "IX_Walls_userID",
                table: "Walls",
                column: "userID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupConnections");

            migrationBuilder.DropTable(
                name: "Terms");

            migrationBuilder.DropTable(
                name: "Walls");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
