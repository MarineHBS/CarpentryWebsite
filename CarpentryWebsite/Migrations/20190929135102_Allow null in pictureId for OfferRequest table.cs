using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpentryWebsite.Migrations
{
    public partial class AllownullinpictureIdforOfferRequesttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfferRequest_Picture_PictureId",
                table: "OfferRequest");

            migrationBuilder.AlterColumn<int>(
                name: "PictureId",
                table: "OfferRequest",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_OfferRequest_Picture_PictureId",
                table: "OfferRequest",
                column: "PictureId",
                principalTable: "Picture",
                principalColumn: "PictureId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfferRequest_Picture_PictureId",
                table: "OfferRequest");

            migrationBuilder.AlterColumn<int>(
                name: "PictureId",
                table: "OfferRequest",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OfferRequest_Picture_PictureId",
                table: "OfferRequest",
                column: "PictureId",
                principalTable: "Picture",
                principalColumn: "PictureId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
