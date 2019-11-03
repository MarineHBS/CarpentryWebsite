using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace UnitTests
{
    public class ReferencePictureServiceTest : TestBase
    {

        public ReferencePictureServiceTest()
        {
           
        }

        private CarpentryWebsiteContext carpentryWebsiteContext = GetNewDbContext<CarpentryWebsiteContext>();

        [Fact]
        public void TestGetReferencePictureByPictureId()
        {
            int expectedPictureId = 2;
            var service = new ReferencePictureService(carpentryWebsiteContext);
            ReferencePicture result = service.GetReferencePictureDetails(2);
            Assert.Equal(expectedPictureId, result.ReferencePictureId);
            carpentryWebsiteContext.Database.EnsureDeleted();
        }
    }
}
