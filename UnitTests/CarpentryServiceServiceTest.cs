using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System;
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
                .Select(i => new CarpentryService { CarpentryServiceId = i, Name = $"Name{i}", Price = i*500, Description = $"Description{i}", CarpentryServiceTypeId = i+500 });
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
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestEditCarpentryServices()
        {
            string expectedDescription = "Different desc";
            var service = new CarpentryServiceService(carpentryWebsiteContext);
            carpentryWebsiteContext.Entry(service.GetCarpentryServiceDetails(5)).State = EntityState.Detached;

            service.UpdateCarpentryService(new CarpentryService { CarpentryServiceId = 5, Name = "Name", Price = 5000, Description = "Different desc", CarpentryServiceTypeId = 500 });
            CarpentryService result = service.GetCarpentryServiceDetails(5);
            Assert.Equal(expectedDescription, result.Description);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestDeleteCarpentryServices()
        {
            var controller = new CarpentryServiceService(carpentryWebsiteContext);
            controller.DeleteCarpentryService(6);
            CarpentryService result = controller.GetCarpentryServiceDetails(6);
            Assert.Null(result);
        }
    }
}
