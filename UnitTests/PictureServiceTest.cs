using CarpentryWebsite.Controllers;
using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class PictureServiceTest : TestBase
    {

        public PictureServiceTest()
        {
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

        [Fact]
        public void TestGetPictureByName()
        {
            string expectedPictureName = "PictureName5";
            var controller = new PictureService(carpentryWebsiteContext);
            Picture result = controller.GetPictureDetails(5);
            Assert.Equal(expectedPictureName, result.PictureName);
        }

        [Fact]
        public void TestEditPictures()
        {
            string expectedName = "Different Picture Name";
            var service = new PictureService(carpentryWebsiteContext);
            Picture itemToAdd = new Picture { PictureId = 11, PictureName = "Different name" };
            service.AddPicture(itemToAdd);
            carpentryWebsiteContext.Entry(service.GetPictureDetails(11)).State = EntityState.Detached;

            service.UpdatePicture(new Picture(11, "Different Picture Name"));
            Picture result = service.GetPictureDetails(11);
            Assert.Equal(expectedName, result.PictureName);
        }

        [Fact]
        public void TestDeletePicture()
        {
            var service = new PictureService(carpentryWebsiteContext);
            service.DeletePicture(5);
            Picture result = service.GetPictureDetails(5);
            Assert.Null(result);
        }

        [Fact]
        public void TestAddPicture()
        {
            var service = new PictureService(carpentryWebsiteContext);
            Picture itemToAdd = new Picture { PictureId = 105, PictureName = "Different name" };
            service.AddPicture(itemToAdd);
            Picture result = service.GetPictureDetails(105);
            Assert.Equal(itemToAdd, result);
        }
    }
}
