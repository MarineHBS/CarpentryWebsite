using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class CarpentryServiceServiceTest : TestBase
    {

        public CarpentryServiceServiceTest()
        {
            
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

        [Fact]
        public void TestGetCarpentryServiceById()
        {
            int expectedCarpentryServiceId = 5;
            var controller = new CarpentryServiceService(carpentryWebsiteContext);
            CarpentryService result = controller.GetCarpentryServiceDetails(5);
            Assert.Equal(expectedCarpentryServiceId, result.CarpentryServiceId);
        }

        [Fact]
        public void TestEditCarpentryServices()
        {
            string expectedDescription = "Different desc";
            var service = new CarpentryServiceService(carpentryWebsiteContext);
            CarpentryService itemToAdd = new CarpentryService { CarpentryServiceId = 14, Name = "Name", Price = 5000, Description = "Different desc", CarpentryServiceTypeId = 500 };
            service.AddCarpentryService(itemToAdd);
            carpentryWebsiteContext.Entry(service.GetCarpentryServiceDetails(14)).State = EntityState.Detached;

            service.UpdateCarpentryService(new CarpentryService { CarpentryServiceId = 14, Name = "Name", Price = 5000, Description = "Different desc", CarpentryServiceTypeId = 501 });
            CarpentryService result = service.GetCarpentryServiceDetails(14);
            Assert.Equal(expectedDescription, result.Description);
        }

        [Fact]
        public void TestDeleteCarpentryServices()
        {
            var controller = new CarpentryServiceService(carpentryWebsiteContext);
            controller.DeleteCarpentryService(6);
            CarpentryService result = controller.GetCarpentryServiceDetails(6);
            Assert.Null(result);
        }

        [Fact]
        public void TestAddCarpentryService()
        {
            var service = new CarpentryServiceService(carpentryWebsiteContext);
            CarpentryService itemToAdd = new CarpentryService { CarpentryServiceId = 105, Name = "Name", Price = 5000, Description = "Different desc", CarpentryServiceTypeId = 500 };
            service.AddCarpentryService(itemToAdd);
            CarpentryService result = service.GetCarpentryServiceDetails(105);
            Assert.Equal(itemToAdd, result);
        }
    }
}
