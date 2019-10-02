using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpentryWebsite.Migrations
{
    public partial class Addedfabricandservices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CarpentryService",
                columns: new[] { "CarpentryServiceId", "CarpentryServiceTypeId", "Description", "Name", "PictureId", "Price" },
                values: new object[,]
                {
                    { 1, 1, null, "Csak áthúzás, szivacsos", null, 18000 },
                    { 2, 1, null, "Csak áthúzás, rugós", null, 25000 },
                    { 3, 1, null, "Áthúzás szivacs cserével", null, 25000 },
                    { 4, 1, null, "Áthúzás rugó cserével", null, 31000 }
                });

            migrationBuilder.UpdateData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 1,
                column: "Name",
                value: "Franciaágyak");

            migrationBuilder.InsertData(
                table: "CarpentryServiceType",
                columns: new[] { "CarpentryServiceTypeId", "Name" },
                values: new object[,]
                {
                    { 2, "Heverők" },
                    { 3, "Fotelek" },
                    { 4, "Kanapék" },
                    { 5, "Szék" },
                    { 6, "Antik bútorok" },
                    { 7, "Autókárpitozás" }
                });

            migrationBuilder.InsertData(
                table: "FabricType",
                columns: new[] { "FabricTypeId", "Name" },
                values: new object[,]
                {
                    { 6, "Matrachuzatok" },
                    { 5, "Plüss bútorszövetek" },
                    { 4, "Vízlepergető bútorszövetek" },
                    { 3, "Vízzel tisztítható bútorszövetek" },
                    { 2, "Síkszövetek" },
                    { 1, "Textilbőrök" }
                });

            migrationBuilder.InsertData(
                table: "Picture",
                columns: new[] { "PictureId", "PictureName", "PictureUrl" },
                values: new object[,]
                {
                    { 20, "fabric_picture_20.png", null },
                    { 19, "fabric_picture_19.png", null },
                    { 18, "fabric_picture_18.png", null },
                    { 17, "fabric_picture_17.png", null },
                    { 16, "fabric_picture_16.png", null },
                    { 15, "fabric_picture_15.png", null },
                    { 14, "fabric_picture_14.png", null },
                    { 13, "fabric_picture_13.png", null },
                    { 12, "fabric_picture_12.png", null },
                    { 11, "fabric_picture_11.png", null },
                    { 3, "fabric_picture_3.png", null },
                    { 9, "fabric_picture_9.png", null },
                    { 8, "fabric_picture_8.png", null },
                    { 7, "fabric_picture_7.png", null },
                    { 6, "fabric_picture_6.png", null },
                    { 5, "fabric_picture_5.png", null },
                    { 4, "fabric_picture_4.png", null },
                    { 21, "fabric_picture_21.png", null },
                    { 2, "fabric_picture_2.png", null },
                    { 1, "fabric_picture_1.png", null },
                    { 10, "fabric_picture_10.png", null },
                    { 22, "fabric_picture_22.png", null }
                });

            migrationBuilder.InsertData(
                table: "CarpentryService",
                columns: new[] { "CarpentryServiceId", "CarpentryServiceTypeId", "Description", "Name", "PictureId", "Price" },
                values: new object[,]
                {
                    { 5, 2, null, "Szivacs cserével", null, 12000 },
                    { 14, 6, null, "Látottak alapján", null, 20000 },
                    { 13, 5, null, "Szivacs cserével", null, 4500 },
                    { 12, 5, null, "Ülés és támla", null, 3000 },
                    { 11, 4, null, "Szivacs- vagy rugócsere", null, 4000 },
                    { 15, 7, null, "Látottak alapján", null, 20000 },
                    { 9, 3, null, "Szivacs- vagy rugócsere", null, 3000 },
                    { 8, 3, null, "Csak áthúzás", null, 10000 },
                    { 7, 2, null, "Szivacs- és rugócserével", null, 20000 },
                    { 6, 2, null, "Rugó cserével", null, 15000 },
                    { 10, 4, null, "Csak áthúzás", null, 15000 }
                });

            migrationBuilder.InsertData(
                table: "Fabric",
                columns: new[] { "FabricId", "FabricTypeId", "Name", "PictureId", "Price" },
                values: new object[,]
                {
                    { 12, 3, "Infinity", 12, 3990 },
                    { 20, 6, "Alaska", 20, 1990 },
                    { 19, 5, "Genf", 19, 5520 },
                    { 18, 5, "Fidélió", 18, 7250 },
                    { 17, 5, "Baccara", 17, 5520 },
                    { 16, 4, "Genezis", 16, 7920 },
                    { 15, 4, "Tarim", 15, 3140 },
                    { 14, 4, "Samoa", 14, 2350 },
                    { 13, 4, "Eerie", 13, 2790 },
                    { 11, 3, "Imperia", 11, 5190 },
                    { 6, 2, "Artemis", 6, 2980 },
                    { 9, 3, "Astoria", 9, 9230 },
                    { 8, 2, "Diana", 8, 10670 },
                    { 7, 2, "City life", 7, 2450 },
                    { 21, 6, "Galeria 9520", 21, 1790 },
                    { 5, 1, "Sorrento", 5, 5190 },
                    { 4, 1, "Dollár", 4, 2450 },
                    { 3, 1, "Essenza", 3, 11850 },
                    { 2, 1, "Bölény", 2, 6760 },
                    { 1, 1, "Almara", 1, 2390 },
                    { 10, 3, "Carabu", 10, 12180 },
                    { 22, 6, "Galeria 9521", 22, 1790 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "CarpentryService",
                keyColumn: "CarpentryServiceId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Fabric",
                keyColumn: "FabricId",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "FabricType",
                keyColumn: "FabricTypeId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FabricType",
                keyColumn: "FabricTypeId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FabricType",
                keyColumn: "FabricTypeId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "FabricType",
                keyColumn: "FabricTypeId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "FabricType",
                keyColumn: "FabricTypeId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "FabricType",
                keyColumn: "FabricTypeId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Picture",
                keyColumn: "PictureId",
                keyValue: 22);

            migrationBuilder.UpdateData(
                table: "CarpentryServiceType",
                keyColumn: "CarpentryServiceTypeId",
                keyValue: 1,
                column: "Name",
                value: "Szövetcsoport 1");
        }
    }
}
