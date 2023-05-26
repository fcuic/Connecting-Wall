using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Registration.Migrations.APIDB
{
    public partial class APIDBContextAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupConnections_Walls_WallID1",
                table: "GroupConnections");

            migrationBuilder.DropForeignKey(
                name: "FK_Terms_GroupConnections_GroupConnectionConnectionID",
                table: "Terms");

            migrationBuilder.DropIndex(
                name: "IX_Terms_GroupConnectionConnectionID",
                table: "Terms");

            migrationBuilder.DropIndex(
                name: "IX_GroupConnections_WallID1",
                table: "GroupConnections");

            migrationBuilder.DropColumn(
                name: "GroupConnectionConnectionID",
                table: "Terms");

            migrationBuilder.DropColumn(
                name: "WallID1",
                table: "GroupConnections");

            migrationBuilder.AlterColumn<Guid>(
                name: "GroupConnectionID",
                table: "Terms",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "WallID",
                table: "GroupConnections",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Terms_GroupConnectionID",
                table: "Terms",
                column: "GroupConnectionID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupConnections_WallID",
                table: "GroupConnections",
                column: "WallID");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupConnections_Walls_WallID",
                table: "GroupConnections",
                column: "WallID",
                principalTable: "Walls",
                principalColumn: "WallID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Terms_GroupConnections_GroupConnectionID",
                table: "Terms",
                column: "GroupConnectionID",
                principalTable: "GroupConnections",
                principalColumn: "ConnectionID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupConnections_Walls_WallID",
                table: "GroupConnections");

            migrationBuilder.DropForeignKey(
                name: "FK_Terms_GroupConnections_GroupConnectionID",
                table: "Terms");

            migrationBuilder.DropIndex(
                name: "IX_Terms_GroupConnectionID",
                table: "Terms");

            migrationBuilder.DropIndex(
                name: "IX_GroupConnections_WallID",
                table: "GroupConnections");

            migrationBuilder.AlterColumn<string>(
                name: "GroupConnectionID",
                table: "Terms",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "GroupConnectionConnectionID",
                table: "Terms",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "WallID",
                table: "GroupConnections",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "WallID1",
                table: "GroupConnections",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Terms_GroupConnectionConnectionID",
                table: "Terms",
                column: "GroupConnectionConnectionID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupConnections_WallID1",
                table: "GroupConnections",
                column: "WallID1");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupConnections_Walls_WallID1",
                table: "GroupConnections",
                column: "WallID1",
                principalTable: "Walls",
                principalColumn: "WallID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Terms_GroupConnections_GroupConnectionConnectionID",
                table: "Terms",
                column: "GroupConnectionConnectionID",
                principalTable: "GroupConnections",
                principalColumn: "ConnectionID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
