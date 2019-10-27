using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class CarpentryServiceServiceTest
    {

        public CarpentryServiceServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            var carpentryServices = Enumerable.Range(1, 10)
                .Select(i => new CarpentryService { CarpentryServiceId = i, Name = $"Name{i}", Price = i*500, Description = $"Description{i}", CarpentryServiceTypeId = i });
            context.CarpentryService.AddRange(carpentryServices);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetCarpentryServiceById()
        {
            int expectedCarpentryServiceId = 5;
            var controller = new CarpentryServiceService(carpentryWebsiteContext);
            CarpentryService result = controller.GetCarpentryServiceDetails(5);
            Assert.Equal(expectedCarpentryServiceId, result.CarpentryServiceId);
        }
    }
}
