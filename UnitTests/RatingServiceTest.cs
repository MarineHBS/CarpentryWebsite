using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class RatingServiceTest : TestBase
    {

        public RatingServiceTest()
        {
            //InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

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

        [Fact]
        public void TestEditRatings()
        {
            string expectedText = "Nem vagyok elégedett";
            var service = new RatingService(carpentryWebsiteContext);
            Rating itemToAdd = new Rating { RatingId = 14, User = "5", UserRating = "Wrox Press", Text = "Nem vagyok elégedett" };
            service.AddRating(itemToAdd);
            carpentryWebsiteContext.Entry(service.GetRatingDetails(14)).State = EntityState.Detached;

            service.UpdateRating(new Rating { RatingId = 14, User = "5", UserRating = "Wrox Press", Text = "Nem vagyok elégedett" });
            Rating result = service.GetRatingDetails(14);
            Assert.Equal(expectedText, result.Text);
        }

        [Fact]
        public void TestDeleteRating()
        {
            var service = new RatingService(carpentryWebsiteContext);
            service.DeleteRating(5);
            Rating result = service.GetRatingDetails(5);
            Assert.Null(result);
        }

        [Fact]
        public void TestAddRating()
        {
            var service = new RatingService(carpentryWebsiteContext);
            Rating itemToAdd = new Rating { RatingId = 105, User = "5", UserRating = "Wrox Press", Text = "Nem vagyok elégedett" };
            service.AddRating(itemToAdd);
            Rating result = service.GetRatingDetails(105);
            Assert.Equal(itemToAdd, result);
        }
    }
}
