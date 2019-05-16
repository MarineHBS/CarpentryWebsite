using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpentryWebsite.Migrations
{
    public partial class CarpentryServiceUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CarpentryService",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "CarpentryService");
        }
    }
}
