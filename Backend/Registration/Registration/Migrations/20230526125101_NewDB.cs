using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Registration.Migrations
{
    public partial class NewDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Wall",
                columns: table => new
                {
                    WallID = table.Column<Guid>(nullable: false),
                    WallName = table.Column<string>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: true),
                    UserID = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wall", x => x.WallID);
                    table.ForeignKey(
                        name: "FK_Wall_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Wall_UserID",
                table: "Wall",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Wall");
        }
    }
}
