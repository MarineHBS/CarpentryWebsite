using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpentryWebsite.Migrations
{
    public partial class Ratingtablechanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserRating",
                table: "Rating",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserRating",
                table: "Rating",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
