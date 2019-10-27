using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class PictureServiceTest
    {

        public PictureServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            var pictures = Enumerable.Range(1, 10)
                .Select(i => new Picture(i, $"PictureName{i}"));
            context.Picture.AddRange(pictures);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetPictureByName()
        {
            string expectedPictureName = "PictureName5";
            var controller = new PictureService(carpentryWebsiteContext);
            Picture result = controller.GetPictureDetails(5);
            Assert.Equal(expectedPictureName, result.PictureName);
        }
    }
}
