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
            context.Database.EnsureDeleted();
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
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestEditFabrics()
        {
            int expectedPrice = 4500;
            var service = new FabricService(carpentryWebsiteContext);
            carpentryWebsiteContext.Entry(service.GetFabricDetails(9)).State = EntityState.Detached;

            service.UpdateFabric(new Fabric(9, "FabricName", 4500, 3), null, "false");
            Fabric result = service.GetFabricDetails(9);
            Assert.Equal(expectedPrice, result.Price);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestDeleteFabrics()
        {
            var service = new FabricService(carpentryWebsiteContext);
            service.DeleteFabric(5);
            Fabric result = service.GetFabricDetails(5);
            Assert.Null(result);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }
    }
}
