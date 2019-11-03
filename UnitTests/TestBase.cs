using CarpentryWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UnitTests
{
    public abstract class TestBase
    {
        protected static T GetNewDbContext<T>() where T : DbContext
        {
            var services = new ServiceCollection();

            services
                .AddEntityFrameworkSqlServer()
                .AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<T>(options => options.UseInMemoryDatabase());

            var serviceProvider = services.BuildServiceProvider();

            var dbContext = serviceProvider.GetRequiredService<T>();

            dbContext.Database.EnsureDeleted();

            var carpentryServiceTypes = Enumerable.Range(1, 10)
                .Select(i => new CarpentryServiceType { CarpentryServiceTypeId = i, Name = $"Name{i}" });
            dbContext.AddRange(carpentryServiceTypes);

            var carpentryServices = Enumerable.Range(1, 10)
                .Select(i => new CarpentryService { CarpentryServiceId = i, Name = $"Name{i}", Price = i * 500, Description = $"Description{i}", CarpentryServiceTypeId = i + 500 });
            dbContext.AddRange(carpentryServices);
            
            var contacts = Enumerable.Range(1, 10)
                .Select(i => new Contact { ContactId = i, Name = $"Name1e{i}", Phone = $"06304234{i}323", EmailAddress = "test1Email@email.hu" });
            dbContext.AddRange(contacts);

            var fabrics = Enumerable.Range(1, 10)
                .Select(i => new Fabric(i, $"fabricName{i}", 5000 * i, i));
            dbContext.AddRange(fabrics);

            var fabricTypes = Enumerable.Range(1, 10)
                .Select(i => new FabricType { FabricTypeId = i, Name = $"Name{i}" });
            dbContext.AddRange(fabricTypes);

            var offerRequests = Enumerable.Range(1, 10)
                .Select(i => new OfferRequest($"Name{i}", $"testEmail{i}@email.hu", $"message is: {i}"));
            dbContext.AddRange(offerRequests);

            var pictures = Enumerable.Range(1, 10)
                .Select(i => new Picture(i, $"PictureName{i}"));
            dbContext.AddRange(pictures);

            var ratings = Enumerable.Range(1, 10)
                .Select(i => new Rating { RatingId = i, User = $"User{i}", UserRating = "Wrox Press", Text = "Elégedett vagyok" });
            dbContext.AddRange(ratings);

            var referencePictures = Enumerable.Range(1, 10)
                .Select(i => new ReferencePicture { ReferencePictureId = i, Picture = new Picture(i + 20, $"PictureName{i}"), PictureId = i });
            dbContext.AddRange(referencePictures);

            return dbContext;
        }
    }
}
