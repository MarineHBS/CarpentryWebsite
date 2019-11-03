using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class FabricTypeServiceTest : TestBase
    {

        public FabricTypeServiceTest()
        {
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

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
            FabricType itemToAdd = new FabricType { FabricTypeId = 14, Name = "Different name" };
            service.AddFabricType(itemToAdd);
            carpentryWebsiteContext.Entry(service.GetFabricTypeDetails(14)).State = EntityState.Detached;

            service.UpdateFabricType(new FabricType { FabricTypeId = 14, Name = "Different name" });
            FabricType result = service.GetFabricTypeDetails(14);
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

        [Fact]
        public void TestAddFabricType()
        {
            var service = new FabricTypeService(carpentryWebsiteContext);
            FabricType itemToAdd = new FabricType { FabricTypeId = 105, Name = "Different name" };
            service.AddFabricType(itemToAdd);
            FabricType result = service.GetFabricTypeDetails(105);
            Assert.Equal(itemToAdd, result);
        }
    }
}
