using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class CarpentryServiceTypeServiceTest
    {

        public CarpentryServiceTypeServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            var fabricTypes = Enumerable.Range(1, 10)
                .Select(i => new CarpentryServiceType { CarpentryServiceTypeId = i, Name = $"Name{i}"});
            context.CarpentryServiceType.AddRange(fabricTypes);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetCarpentryServiceTypeById()
        {
            int expectedCarpentryServiceTypeId = 5;
            var controller = new CarpentryServiceTypeService(carpentryWebsiteContext);
            CarpentryServiceType result = controller.GetCarpentryServiceTypeDetails(5);
            Assert.Equal(expectedCarpentryServiceTypeId, result.CarpentryServiceTypeId);
        }
    }
}
