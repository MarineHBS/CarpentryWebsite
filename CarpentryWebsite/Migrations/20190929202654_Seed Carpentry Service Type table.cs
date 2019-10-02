using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpentryWebsite.Migrations
{
    public partial class SeedCarpentryServiceTypetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CarpentryServiceType",
                columns: new[] { "CarpentryServiceTypeId", "Name" },
                values: new object[] { 1, "Szövetcsoport 1" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 1);
        }
    }
}
