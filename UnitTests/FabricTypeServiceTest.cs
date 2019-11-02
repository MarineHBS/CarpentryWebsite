using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class FabricTypeServiceTest
    {

        public FabricTypeServiceTest()
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
            var fabricTypes = Enumerable.Range(1, 10)
                .Select(i => new FabricType { FabricTypeId = i, Name = $"Name{i}"});
            context.FabricType.AddRange(fabricTypes);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetFabricTypeById()
        {
            int expectedFabricTypeId = 5;
            var service = new FabricTypeService(carpentryWebsiteContext);
            FabricType result = service.GetFabricTypeDetails(5);
            Assert.Equal(expectedFabricTypeId, result.FabricTypeId);
        }

        [Fact]
        public void TestEditFabricTypes()
        {
            string expectedName = "Different name";
            var service = new FabricTypeService(carpentryWebsiteContext);
            carpentryWebsiteContext.Entry(service.GetFabricTypeDetails(4)).State = EntityState.Detached;

            service.UpdateFabricType(new FabricType { FabricTypeId = 4, Name = "Different name" });
            FabricType result = service.GetFabricTypeDetails(4);
            Assert.Equal(expectedName, result.Name);
        }

        [Fact]
        public void TestDeleteFabricTypes()
        {
            var service = new FabricTypeService(carpentryWebsiteContext);
            service.DeleteFabricType(5);
            FabricType result = service.GetFabricTypeDetails(5);
            Assert.Null(result);
        }
    }
}
