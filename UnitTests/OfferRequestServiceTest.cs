using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using CarpentryWebsite.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class OfferRequestServiceTest : TestBase
    {

        public OfferRequestServiceTest()
        {
            //InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            context.Database.EnsureDeleted();
            var offerRequests = Enumerable.Range(1, 10)
                .Select(i => new OfferRequest ( $"Name{i}", $"testEmail{i}@email.hu", $"message is: {i}" ));
            context.OfferRequest.AddRange(offerRequests);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetOfferRequestsById()
        {
            string expectedEmail = "testEmail7@email.hu";
            var controller = new OfferRequestService(carpentryWebsiteContext);
            OfferRequest result = controller.GetOfferRequestDetails(7);
            Assert.Equal(expectedEmail, result.EmailAddress);
        }

        [Fact]
        public void TestEditOfferRequests()
        {
            string expectedName = "Different name";
            var service = new OfferRequestService(carpentryWebsiteContext);
            OfferRequest itemToAdd = new OfferRequest { OfferRequestId = 17, Name = "New name", EmailAddress = "New email", Message = "New message" };
            service.AddOfferRequest(itemToAdd, null, "false");
            carpentryWebsiteContext.Entry(service.GetOfferRequestDetails(17)).State = EntityState.Detached;

            service.UpdateOfferRequest(new OfferRequest { OfferRequestId = 17, Name = "Different name", EmailAddress = "Different email", Message = "Different message" });
            OfferRequest result = service.GetOfferRequestDetails(17);
            Assert.Equal(expectedName, result.Name);
        }

        [Fact]
        public void TestDeleteOfferRequests()
        {
            var service = new OfferRequestService(carpentryWebsiteContext);
            service.DeleteOfferRequest(5);
            OfferRequest result = service.GetOfferRequestDetails(5);
            Assert.Null(result);
        }

        [Fact]
        public void TestAddOfferRequest()
        {
            var service = new OfferRequestService(carpentryWebsiteContext);
            OfferRequest itemToAdd = new OfferRequest { OfferRequestId = 105, Name = "New name", EmailAddress = "New email", Message = "New message" };
            service.AddOfferRequest(itemToAdd, null, "false");
            OfferRequest result = service.GetOfferRequestDetails(105);
            Assert.Equal(itemToAdd, result);
        }
    }
}
