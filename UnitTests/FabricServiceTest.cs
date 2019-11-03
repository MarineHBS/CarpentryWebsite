using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class FabricServiceTest : TestBase
    {

        public FabricServiceTest()
        {
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();
        
        [Fact]
        public void TestGetFabricById()
        {
            int expectedFabricId = 5;
            var controller = new FabricService(carpentryWebsiteContext);
            Fabric result = controller.GetFabricDetails(5);
            Assert.Equal(expectedFabricId, result.FabricId);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }
        
    }
}
