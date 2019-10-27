using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using CarpentryWebsite.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class OfferRequestServiceTest
    {

        public OfferRequestServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
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
    }
}
