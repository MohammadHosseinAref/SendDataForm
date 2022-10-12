using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class mig1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewsFile_FileType_NewsId",
                table: "NewsFile");

            migrationBuilder.DropIndex(
                name: "IX_NewsFile_NewsId",
                table: "NewsFile");

            migrationBuilder.CreateIndex(
                name: "IX_NewsFile_FileTypeId",
                table: "NewsFile",
                column: "FileTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewsFile_FileType_FileTypeId",
                table: "NewsFile",
                column: "FileTypeId",
                principalTable: "FileType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewsFile_FileType_FileTypeId",
                table: "NewsFile");

            migrationBuilder.DropIndex(
                name: "IX_NewsFile_FileTypeId",
                table: "NewsFile");

            migrationBuilder.CreateIndex(
                name: "IX_NewsFile_NewsId",
                table: "NewsFile",
                column: "NewsId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewsFile_FileType_NewsId",
                table: "NewsFile",
                column: "NewsId",
                principalTable: "FileType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
