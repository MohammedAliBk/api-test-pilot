using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APITestPilot.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateV20 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_TestCaseRequests_StatusCode",
                table: "TestCaseRequests");

            migrationBuilder.DropCheckConstraint(
                name: "CK_TestAssertions_Operator",
                table: "TestAssertions");

            migrationBuilder.DropIndex(
                name: "IX_EndpointResponses_EndpointId_StatusCode",
                table: "EndpointResponses");

            migrationBuilder.DropCheckConstraint(
                name: "CK_EndpointResponses_StatusCode",
                table: "EndpointResponses");

            migrationBuilder.DropColumn(
                name: "ExpectedStatusCode",
                table: "TestCaseRequests");

            migrationBuilder.DropColumn(
                name: "IsNegated",
                table: "TestAssertions");

            migrationBuilder.DropColumn(
                name: "IsDefault",
                table: "EndpointResponses");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Users",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "ResponseKey",
                table: "EndpointResponses",
                type: "varchar(10)",
                unicode: false,
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "ApiSpecifications",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AddColumn<int>(
                name: "VersionNumber",
                table: "ApiSpecifications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddCheckConstraint(
                name: "CK_TestAssertions_Operator",
                table: "TestAssertions",
                sql: "[Operator] IN ('Equal','NotEqual','Contains','NotContains','Exists','NotExists','GreaterThan','GreaterThanOrEqual','LessThan','LessThanOrEqual','MatchesRegex','IsValid')");

            migrationBuilder.CreateIndex(
                name: "IX_Environments_ProjectId",
                table: "Environments",
                column: "ProjectId",
                unique: true,
                filter: "[IsDefault] = 1");

            migrationBuilder.CreateIndex(
                name: "IX_EndpointResponses_EndpointId_ResponseKey",
                table: "EndpointResponses",
                columns: new[] { "EndpointId", "ResponseKey" });

            migrationBuilder.AddCheckConstraint(
                name: "CK_EndpointResponses_StatusCode",
                table: "EndpointResponses",
                sql: "[StatusCode] IS NULL OR [StatusCode] BETWEEN 100 AND 599");

            migrationBuilder.CreateIndex(
                name: "IX_ApiSpecifications_ProjectId",
                table: "ApiSpecifications",
                column: "ProjectId",
                unique: true,
                filter: "[IsActive] = 1");

            migrationBuilder.CreateIndex(
                name: "IX_ApiSpecifications_ProjectId_VersionNumber",
                table: "ApiSpecifications",
                columns: new[] { "ProjectId", "VersionNumber" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_TestAssertions_Operator",
                table: "TestAssertions");

            migrationBuilder.DropIndex(
                name: "IX_Environments_ProjectId",
                table: "Environments");

            migrationBuilder.DropIndex(
                name: "IX_EndpointResponses_EndpointId_ResponseKey",
                table: "EndpointResponses");

            migrationBuilder.DropCheckConstraint(
                name: "CK_EndpointResponses_StatusCode",
                table: "EndpointResponses");

            migrationBuilder.DropIndex(
                name: "IX_ApiSpecifications_ProjectId",
                table: "ApiSpecifications");

            migrationBuilder.DropIndex(
                name: "IX_ApiSpecifications_ProjectId_VersionNumber",
                table: "ApiSpecifications");

            migrationBuilder.DropColumn(
                name: "ResponseKey",
                table: "EndpointResponses");

            migrationBuilder.DropColumn(
                name: "VersionNumber",
                table: "ApiSpecifications");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<int>(
                name: "ExpectedStatusCode",
                table: "TestCaseRequests",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsNegated",
                table: "TestAssertions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDefault",
                table: "EndpointResponses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "ApiSpecifications",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddCheckConstraint(
                name: "CK_TestCaseRequests_StatusCode",
                table: "TestCaseRequests",
                sql: "[ExpectedStatusCode] IS NULL OR [ExpectedStatusCode] BETWEEN 100 AND 599");

            migrationBuilder.AddCheckConstraint(
                name: "CK_TestAssertions_Operator",
                table: "TestAssertions",
                sql: "[Operator] IN ('Equals','NotEquals','Contains','NotContains','Exists','NotExists','GreaterThan','GreaterThanOrEqual','LessThan','LessThanOrEqual','MatchesRegex','IsValid')");

            migrationBuilder.CreateIndex(
                name: "IX_EndpointResponses_EndpointId_StatusCode",
                table: "EndpointResponses",
                columns: new[] { "EndpointId", "StatusCode" });

            migrationBuilder.AddCheckConstraint(
                name: "CK_EndpointResponses_StatusCode",
                table: "EndpointResponses",
                sql: "[StatusCode] BETWEEN 100 AND 599");
        }
    }
}
