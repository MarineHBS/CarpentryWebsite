using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class CarpentryServiceTypeServiceTest : TestBase
    {

        public CarpentryServiceTypeServiceTest()
        {
            //InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

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
        }

        [Fact]
        public void TestEditCarpentryServiceTypes()
        {
            string expectedName = "Edited name";
            var service = new CarpentryServiceTypeService(carpentryWebsiteContext);
            CarpentryServiceType itemToAdd = new CarpentryServiceType { CarpentryServiceTypeId = 16, Name = "Name" };
            service.AddCarpentryServiceType(itemToAdd);
            carpentryWebsiteContext.Entry(service.GetCarpentryServiceTypeDetails(16)).State = EntityState.Detached;

            service.UpdateCarpentryServiceType(new CarpentryServiceType { CarpentryServiceTypeId = 16, Name = "Edited name" });
            CarpentryServiceType result = service.GetCarpentryServiceTypeDetails(16);
            Assert.Equal(expectedName, result.Name);
        }
        [Fact]
        public void TestDeleteCarpentryServiceTypes()
        {
            var service = new CarpentryServiceTypeService(carpentryWebsiteContext);
            service.DeleteCarpentryServiceType(5);
            CarpentryServiceType result = service.GetCarpentryServiceTypeDetails(5);
            Assert.Null(result);
        }

        [Fact]
        public void TestAddCarpentryServiceType()
        {
            var service = new CarpentryServiceTypeService(carpentryWebsiteContext);
            CarpentryServiceType itemToAdd = new CarpentryServiceType { CarpentryServiceTypeId = 105, Name = "Name"};
            service.AddCarpentryServiceType(itemToAdd);
            CarpentryServiceType result = service.GetCarpentryServiceTypeDetails(105);
            Assert.Equal(itemToAdd, result);
        }
    }
}
