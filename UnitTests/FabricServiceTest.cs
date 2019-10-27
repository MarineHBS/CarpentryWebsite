using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class FabricServiceTest
    {

        public FabricServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            var fabrics = Enumerable.Range(1, 10)
                .Select(i => new Fabric( i, $"fabricName{i}", 5000*i, i));
            context.Fabric.AddRange(fabrics);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetFabricById()
        {
            int expectedFabricId = 5;
            var controller = new FabricService(carpentryWebsiteContext);
            Fabric result = controller.GetFabricDetails(5);
            Assert.Equal(expectedFabricId, result.FabricId);
        }
    }
}
