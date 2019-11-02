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
                .Select(i => new ReferencePicture { ReferencePictureId = i, Picture = new Picture(i+20, $"PictureName{i}"), PictureId = i });
            context.ReferencePicture.AddRange(referencePictures);
            int changed = context.SaveChanges();
            carpentryWebsiteContext = context;
        }

        [Fact]
        public void TestGetReferencePictureByPictureId()
        {
            int expectedPictureId = 2;
            var service = new ReferencePictureService(carpentryWebsiteContext);
            ReferencePicture result = service.GetReferencePictureDetails(2);
            Assert.Equal(expectedPictureId, result.ReferencePictureId);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestEditReferencePictures()
        {
            int expectedPictureId = 2;
            var service = new ReferencePictureService(carpentryWebsiteContext);
            carpentryWebsiteContext.Entry(service.GetReferencePictureDetails(2)).State = EntityState.Detached;

            service.UpdateReferencePicture(new ReferencePicture { ReferencePictureId = 2, Picture = new Picture(17, "PictureName5"), PictureId = 5 });
            ReferencePicture result = service.GetReferencePictureDetails(2);
            Assert.Equal(expectedPictureId, result.ReferencePictureId);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }

        [Fact]
        public void TestDeleteReferencePicture()
        {
            var service = new ReferencePictureService(carpentryWebsiteContext);
            service.DeleteReferencePicture(5);
            ReferencePicture result = service.GetReferencePictureDetails(5);
            Assert.Null(result);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }
    }
}
