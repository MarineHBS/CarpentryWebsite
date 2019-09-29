using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpentryWebsite.Migrations
{
    public partial class ChangedPicturetableaddedofferrequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "OfferRequest");

            migrationBuilder.AddColumn<int>(
                name: "PictureId",
                table: "OfferRequest",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OfferRequest_PictureId",
                table: "OfferRequest",
                column: "PictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_OfferRequest_Picture_PictureId",
                table: "OfferRequest",
                column: "PictureId",
                principalTable: "Picture",
                principalColumn: "PictureId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfferRequest_Picture_PictureId",
                table: "OfferRequest");

            migrationBuilder.DropIndex(
                name: "IX_OfferRequest_PictureId",
                table: "OfferRequest");

            migrationBuilder.DropColumn(
                name: "PictureId",
                table: "OfferRequest");

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "OfferRequest",
                nullable: true);
        }
    }
}
