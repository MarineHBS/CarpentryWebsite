using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class ReferencePictureServiceTest
    {

        public ReferencePictureServiceTest()
        {
            InitContext();
        }

        private CarpentryWebsiteContext carpentryWebsiteContext;

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<CarpentryWebsiteContext>()
                .UseInMemoryDatabase();

            var context = new CarpentryWebsiteContext(builder.Options);
            var referencePictures = Enumerable.Range(1, 10)
                .Select(i => new ReferencePicture { ReferencePictureId = i, Picture = new Picture(i+10, $"PictureName{i}"), PictureId = i });
            context.ReferencePicture.AddRange(referencePictures);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetReferencePictureByPictureId()
        {
            int expectedPictureId = 12;
            var service = new ReferencePictureService(carpentryWebsiteContext);
            ReferencePicture result = service.GetReferencePictureDetails(2);
            Assert.Equal(expectedPictureId, result.PictureId);
        }
    }
}
