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
            var service = new CarpentryServiceTypeService(carpentryWebsiteContext);
            CarpentryServiceType result = service.GetCarpentryServiceTypeDetails(5);
            Assert.Equal(expectedCarpentryServiceTypeId, result.CarpentryServiceTypeId);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestEditCarpentryServiceTypes()
        {
            string expectedName = "Edited name";
            var service = new CarpentryServiceTypeService(carpentryWebsiteContext);
            carpentryWebsiteContext.Entry(service.GetCarpentryServiceTypeDetails(5)).State = EntityState.Detached;

            service.UpdateCarpentryServiceType(new CarpentryServiceType { CarpentryServiceTypeId = 5, Name = "Edited name" });
            CarpentryServiceType result = service.GetCarpentryServiceTypeDetails(5);
            Assert.Equal(expectedName, result.Name);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }
        [Fact]
        public void TestDeleteCarpentryServiceTypes()
        {
            var service = new CarpentryServiceTypeService(carpentryWebsiteContext);
            service.DeleteCarpentryServiceType(5);
            CarpentryServiceType result = service.GetCarpentryServiceTypeDetails(5);
            Assert.Null(result);
        }
    }
}
