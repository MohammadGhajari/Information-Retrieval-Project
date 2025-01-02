using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RankUp.Migrations
{
    /// <inheritdoc />
    public partial class addhashingpassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "Users",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "name");
        }
    }
}
