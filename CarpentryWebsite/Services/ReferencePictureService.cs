using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CarpentryWebsite.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace CarpentryWebsite.Models
{
    public class ReferencePictureService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        private IHostingEnvironment _env;

        public ReferencePictureService(UserManager<MyUser> userManager, IHostingEnvironment env)
        {
            _userManager = userManager;
            _env = env;
        }

        public ReferencePictureService()
        {
        }
        public ReferencePictureService(CarpentryWebsiteContext carpentryWebsiteContext)
        {
            db = carpentryWebsiteContext;
        }

        public IEnumerable<ReferencePicture> GetAllReferencePictures()
        {
            try{
                return db.ReferencePicture.ToList();
            }catch{
                throw;
            }
        }

        public IEnumerable<Picture> GetAllReferencePicturesWithUrl()
        {
            try
            {
                IEnumerable<Picture> query = (from p in db.Picture
                             from rp in db.ReferencePicture
                             where p.PictureId == rp.PictureId
                             select p).ToList();

                return query;
            }
            catch
            {
                throw;
            }
        }

        public int AddReferencePicture(IFormFile image)
        {
            try
            {
                var dir = _env.ContentRootPath;

                string pathToReferencePictures = "/Images/reference_pictures";

                string fullPath = dir + pathToReferencePictures;

                if (!Directory.Exists(fullPath))
                {
                    Directory.CreateDirectory(fullPath);
                }

                int fileSuffix = 1;

                string fullFileName = "reference_picture_" + fileSuffix + ".png";

                bool exists = System.IO.File.Exists(Path.Combine(fullPath, fullFileName));

                while (exists)
                {
                    fileSuffix++;
                    fullFileName = "reference_picture_" + fileSuffix + ".png";
                    exists = System.IO.File.Exists(Path.Combine(fullPath, fullFileName));
                }

                using (var fileStream = new FileStream(Path.Combine(fullPath, fullFileName), FileMode.Create, FileAccess.Write))
                {
                    image.CopyTo(fileStream);

                    ReferencePicture referencePicture = new ReferencePicture();
                    Picture pictureExists = db.Picture.Where(p => p.PictureName == fullFileName).FirstOrDefault();

                    if (pictureExists == null)
                    {
                        Picture picture = new Picture(0, fullFileName);
                        db.Picture.Add(picture);
                        referencePicture.PictureId = picture.PictureId;
                        referencePicture.Picture = picture;
                    }
                    else
                    {
                        referencePicture.PictureId = pictureExists.PictureId;
                        referencePicture.Picture = pictureExists;
                    }


                    db.ReferencePicture.Add(referencePicture);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch
            {
                throw;
            }
        }

        public int UpdateReferencePicture(ReferencePicture referencePicture)
        {
            try
            {
                db.Entry(referencePicture).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public ReferencePicture GetReferencePictureDetails(int id)
        {
            try
            {
                ReferencePicture referencePicture = db.ReferencePicture.Find(id);
                return referencePicture;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteReferencePicture(int id)
        {
            try
            {
                var dir = _env.ContentRootPath;

                string pathToReferencePictures = "/Images/reference_pictures";

                string fullPath = dir + pathToReferencePictures;
               
                Picture picture = db.Picture.Find(id);
                db.Picture.Remove(picture);
                File.Delete(Path.Combine(fullPath, picture.PictureName));
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
