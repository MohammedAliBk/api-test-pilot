using APITestPilot.Domain.Enums;

namespace APITestPilot.Domain.Entities
{
    public class TestCaseExtraction
    {
        public Guid Id { get; set; }
        public Guid TestCaseId { get; set; }
        public string VariableName { get; set; } = null!;
        public ExtractionSource Source { get; set; }
        public string Path { get; set; } = null!;
        public bool IsRequired { get; set; } = true;
        public TestCase TestCase { get; set; } = null!;
    }
}
