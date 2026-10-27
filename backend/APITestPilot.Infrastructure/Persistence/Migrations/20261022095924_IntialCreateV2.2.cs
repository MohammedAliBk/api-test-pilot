using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APITestPilot.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class IntialCreateV22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VariablesJson",
                table: "TestSuites",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCleanup",
                table: "TestCases",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "OnFailure",
                table: "TestCases",
                type: "varchar(20)",
                unicode: false,
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "TestCases",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TestCaseExtractions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TestCaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VariableName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Source = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Path = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestCaseExtractions", x => x.Id);
                    table.CheckConstraint("CK_TestCaseExtractions_Source", "[Source] IN ('ResponseBody','ResponseHeader')");
                    table.ForeignKey(
                        name: "FK_TestCaseExtractions_TestCases_TestCaseId",
                        column: x => x.TestCaseId,
                        principalTable: "TestCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestCases_TestSuiteId_SortOrder",
                table: "TestCases",
                columns: new[] { "TestSuiteId", "SortOrder" },
                unique: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_TestCases_OnFailure",
                table: "TestCases",
                sql: "[OnFailure] IN ('Stop','Continue')");

            migrationBuilder.CreateIndex(
                name: "IX_TestCaseExtractions_TestCaseId_VariableName",
                table: "TestCaseExtractions",
                columns: new[] { "TestCaseId", "VariableName" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestCaseExtractions");

            migrationBuilder.DropIndex(
                name: "IX_TestCases_TestSuiteId_SortOrder",
                table: "TestCases");

            migrationBuilder.DropCheckConstraint(
                name: "CK_TestCases_OnFailure",
                table: "TestCases");

            migrationBuilder.DropColumn(
                name: "VariablesJson",
                table: "TestSuites");

            migrationBuilder.DropColumn(
                name: "IsCleanup",
                table: "TestCases");

            migrationBuilder.DropColumn(
                name: "OnFailure",
                table: "TestCases");

            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "TestCases");
        }
    }
}
