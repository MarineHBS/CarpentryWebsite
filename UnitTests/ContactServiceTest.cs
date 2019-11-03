using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class ContactServiceTest : TestBase
    {

        public ContactServiceTest()
        {
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

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
            Contact itemToAdd = new Contact { ContactId = 13, Name = "Name", Phone = "062088888888", EmailAddress = "testEmail@email.hu" };
            service.AddContact(itemToAdd);
            carpentryWebsiteContext.Entry(service.GetContactDetails(13)).State = EntityState.Detached;

            service.UpdateContact(new Contact { ContactId = 13, Name = "Name", Phone = "062088888888", EmailAddress = "testEmail@email.hu" });
            Contact result = service.GetContactDetails(13);
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

        [Fact]
        public void TestAddContact()
        {
            var service = new ContactService(carpentryWebsiteContext);
            Contact itemToAdd = new Contact { ContactId = 105, Name = "Name", Phone = "062088888888", EmailAddress = "testEmail@email.hu" };
            service.AddContact(itemToAdd);
            Contact result = service.GetContactDetails(105);
            Assert.Equal(itemToAdd, result);
        }
    }
}
