using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RankUp.Migrations
{
    /// <inheritdoc />
    public partial class fixmodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Sites",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Keywords",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "email",
                table: "Keywords");
        }
    }
}
