using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class ContactServiceTest
    {

        public ContactServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            var contacts = Enumerable.Range(1, 10)
                .Select(i => new Contact { ContactId = i, Name = $"Name1e{i}", Phone = $"06304234{i}323", EmailAddress = "test1Email@email.hu" });
            context.Contact.AddRange(contacts);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestGetContactsById()
        {
            string expectedContactPhone = "063042342323";
            var service = new ContactService(carpentryWebsiteContext);
            Contact result = service.GetContactDetails(2);
            Assert.Equal(expectedContactPhone, result.Phone);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestEditContacts()
        {
            string expectedPhone = "062088888888";
            var service = new ContactService(carpentryWebsiteContext);
            carpentryWebsiteContext.Entry(service.GetContactDetails(3)).State = EntityState.Detached;

            service.UpdateContact(new Contact { ContactId = 3, Name = "Name", Phone = "062088888888", EmailAddress = "testEmail@email.hu" });
            Contact result = service.GetContactDetails(3);
            Assert.Equal(expectedPhone, result.Phone);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestDeleteContacts()
        {
            var service = new ContactService(carpentryWebsiteContext);
            service.DeleteContact(5);
            Contact result = service.GetContactDetails(5);
            Assert.Null(result);
        }
    }
}
