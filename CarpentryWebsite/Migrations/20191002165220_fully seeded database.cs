using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpentryWebsite.Migrations
{
    public partial class fullyseededdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Contact",
                columns: new[] { "ContactId", "EmailAddress", "Name", "Phone" },
                values: new object[,]
                {
                    { 1, "szabo.janos@butorkarpitos.hu", "Szabó János", "202-555-0112" },
                    { 2, "kovacs.akos@butorkarpitos.hu", "Kovács Ákos", "202-555-0113" },
                    { 3, "nagy.bela@butorkarpitos.hu", "Nagy Béla", "202-555-0155" }
                });

            migrationBuilder.InsertData(
                table: "Picture",
                columns: new[] { "PictureId", "PictureName", "PictureUrl" },
                values: new object[,]
                {
                    { 33, "reference_picture_11.png", null },
                    { 32, "reference_picture_10.png", null },
                    { 31, "reference_picture_9.png", null },
                    { 30, "reference_picture_8.png", null },
                    { 28, "reference_picture_6.png", null },
                    { 29, "reference_picture_7.png", null },
                    { 26, "reference_picture_4.png", null },
                    { 25, "reference_picture_3.png", null },
                    { 24, "reference_picture_2.png", null },
                    { 23, "reference_picture_1.png", null },
                    { 27, "reference_picture_5.png", null }
                });

            migrationBuilder.InsertData(
                table: "Rating",
                columns: new[] { "RatingId", "Text", "User", "UserRating" },
                values: new object[,]
                {
                    { 4, "Mindennel meg voltam elégedve", "Tibor", "Elégedett" },
                    { 1, "Minden szuper, csak ajánlani tudom!", "Szabó Béla", "Elégedett" },
                    { 2, "Gyors és hatékony.", "Tóth János", "Nagyon elégedett" },
                    { 3, "Korrekt, szakértő kiszolgálás. Gyors, pontos értékesítés.", "Kovács Ákos", "Nagyon elégedett" },
                    { 5, "Kicsit lassan zajlott a szolgáltatás véghezvitele, de összességében elfogadható", "István", "Közepesen elégedett" }
                });

            migrationBuilder.InsertData(
                table: "ReferencePicture",
                columns: new[] { "ReferencePictureId", "PictureId" },
                values: new object[,]
                {
                    { 1, 23 },
                    { 2, 24 },
                    { 3, 25 },
                    { 4, 26 },
                    { 5, 27 },
                    { 6, 28 },
                    { 7, 29 },
                    { 8, 30 },
                    { 9, 31 },
                    { 10, 32 },
                    { 11, 33 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Rating",
                keyColumn: "RatingId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Rating",
                keyColumn: "RatingId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Rating",
                keyColumn: "RatingId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Rating",
                keyColumn: "RatingId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Rating",
                keyColumn: "RatingId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "ReferencePicture",
                keyColumn: "ReferencePictureId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 33);
        }
    }
}
