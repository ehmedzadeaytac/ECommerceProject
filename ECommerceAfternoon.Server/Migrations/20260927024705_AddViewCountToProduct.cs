using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerceAfternoon.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddViewCountToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "Products");
        }
    }
}
