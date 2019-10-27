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
            var controller = new FabricTypeService(carpentryWebsiteContext);
            FabricType result = controller.GetFabricTypeDetails(5);
            Assert.Equal(expectedFabricTypeId, result.FabricTypeId);
        }
    }
}
