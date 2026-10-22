using System;
using System.Collections.Generic;
using System.Text;

namespace APITestPilot.Domain.Enums
{
    public enum TestRunStatus { Queued, Running, Passed, Failed, Cancelled, Error }
    public enum TestResultStatus { Pending, Running, Passed, Failed, Skipped, Error }
    public enum AssertionResultStatus { Passed, Failed, Skipped, Error }
    public enum TriggerType { Manual, Scheduled, Api }
    public enum TestCategory { Functional, Validation, Negative, Boundary, Schema, Security }
    public enum TestSource { Generated, Manual, Imported }
    public enum AssertionType { StatusCode, JsonPath, Header, ResponseTime, ContentType, Schema, BodyContains }
    public enum AssertionOperator
    {
        Equal, NotEqual, Contains, NotContains, Exists, NotExists,
        GreaterThan, GreaterThanOrEqual, LessThan, LessThanOrEqual, MatchesRegex, IsValid
    }
    public enum OnFailureAction { Stop, Continue }
    public enum ExtractionSource { ResponseBody, ResponseHeader }
}
