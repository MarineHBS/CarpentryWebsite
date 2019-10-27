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
                .Select(i => new Contact { ContactId = i, Name = $"Name{i}", Phone = $"06304234{i}323", EmailAddress = "testEmail@email.hu" });
            context.Contact.AddRange(contacts);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetContactsById()
        {
            string expectedContactPhone = "063042342323";
            var controller = new ContactService(carpentryWebsiteContext);
            Contact result = controller.GetContactDetails(2);
            Assert.Equal(expectedContactPhone, result.Phone);
        }
    }
}
