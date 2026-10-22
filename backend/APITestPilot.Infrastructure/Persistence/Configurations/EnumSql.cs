using System;
using System.Collections.Generic;
using System.Text;

namespace APITestPilot.Infrastructure.Persistence.Configurations
{
    public static class EnumSql
    {
        public static string InList<TEnum>() where TEnum : struct, Enum
            => string.Join(",", Enum.GetNames<TEnum>().Select(n => $"'{n}'"));
    }
}
