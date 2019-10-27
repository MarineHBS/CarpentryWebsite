using CarpentryWebsite.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Services
{
    public class OfferRequestService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        private IHostingEnvironment _env;

        public OfferRequestService(UserManager<MyUser> userManager, IHostingEnvironment env)
        {
            _userManager = userManager;
            _env = env;
        }

        public OfferRequestService()
        {
        }
        public OfferRequestService(CarpentryWebsiteContext carpentryWebsiteContext)
        {
            db = carpentryWebsiteContext;
        }

        public IEnumerable<OfferRequest> GetAllOfferRequests()
        {
            try
            {
                return db.OfferRequest.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddOfferRequest(OfferRequest offerRequest, IFormFile image, string imageAdded)
        {
            try
            {
                if(imageAdded.Equals("false"))
                {
                    db.OfferRequest.Add(offerRequest);
                    db.SaveChanges();
                    return 1;
                }
                var dir = _env.ContentRootPath;

                string pathToFabricPictures = "/Images/offer_pictures";

                string fullPath = dir + pathToFabricPictures;

                if (!Directory.Exists(fullPath))
                {
                    Directory.CreateDirectory(fullPath);
                }

                int fileSuffix = 1;

                string fullFileName = "offer_picture_" + fileSuffix + ".png";

                bool exists = File.Exists(Path.Combine(fullPath, fullFileName));

                while (exists)
                {
                    fileSuffix++;
                    fullFileName = "offer_picture_" + fileSuffix + ".png";
                    exists = File.Exists(Path.Combine(fullPath, fullFileName));
                }

                using (var fileStream = new FileStream(Path.Combine(fullPath, fullFileName), FileMode.Create, FileAccess.Write))
                {
                    image.CopyTo(fileStream);

                    OfferRequest offerRequestToCreate = new OfferRequest();
                    Picture pictureExists = db.Picture
                    .Where(p => p.PictureName == fullFileName)
                    .FirstOrDefault();

                    if (pictureExists == null)
                    {
                        Picture picture = new Picture(0, fullFileName);
                        db.Picture.Add(picture);
                        offerRequest.PictureId = picture.PictureId;
                        offerRequest.Picture = picture;
                    }
                    else
                    {
                        offerRequest.PictureId = pictureExists.PictureId;
                        offerRequest.Picture = pictureExists;
                    }

                    db.OfferRequest.Add(offerRequest);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch
            {
                throw;
            }
        }

        public int UpdateOfferRequest(OfferRequest offerRequest)
        {
            try
            {
                db.Entry(offerRequest).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public OfferRequest GetOfferRequestDetails(int id)
        {
            try
            {
                OfferRequest offerRequest = db.OfferRequest.Find(id);
                return offerRequest;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteOfferRequest(int id)
        {
            try
            {
                OfferRequest offerRequest = db.OfferRequest.Find(id);
                db.OfferRequest.Remove(offerRequest);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
