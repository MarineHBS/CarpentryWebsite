using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class RatingServiceTest
    {

        public RatingServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            var ratings = Enumerable.Range(1, 10)
                .Select(i => new Rating { RatingId = i, User = $"User{i}", UserRating = "Wrox Press", Text = "Elégedett vagyok" });
            context.Rating.AddRange(ratings);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetRatingByUser()
        {
            string expectedUser = "User2";
            var controller = new RatingService(carpentryWebsiteContext);
            Rating result = controller.GetRatingDetails(2);
            Assert.Equal(expectedUser, result.User);
        }
    }
}
