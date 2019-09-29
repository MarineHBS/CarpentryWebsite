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
    public class FabricService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        private IHostingEnvironment _env;

        public FabricService(UserManager<MyUser> userManager, IHostingEnvironment env)
        {
            _userManager = userManager;
            _env = env;
        }

        public FabricService()
        {
        }

        public IEnumerable<Fabric> GetAllFabrics()
        {
            try
            {
                return db.Fabric.ToList();
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<Picture> GetFabricsPictureUrl()
        {
            try
            {
                IEnumerable<Picture> query = (from p in db.Picture
                                              from f in db.Fabric
                                              where p.PictureId == f.PictureId
                                              select p).ToList();

                return query;
            }
            catch
            {
                throw;
            }
        }

        public int AddFabric(Fabric fabric, IFormFile image)
        {
            try
            {
                var dir = _env.ContentRootPath;

                string pathToFabricPictures = "/ClientApp/src/assets/fabric_pictures";

                string fullPath = dir + pathToFabricPictures;

                if (!Directory.Exists(fullPath))
                {
                    Directory.CreateDirectory(fullPath);
                }

                int fileSuffix = 1;

                string fullFileName = "fabric_picture_" + fileSuffix + ".png";

                bool exists = System.IO.File.Exists(Path.Combine(fullPath, fullFileName));

                while (exists)
                {
                    fileSuffix++;
                    fullFileName = "fabric_picture_" + fileSuffix + ".png";
                    exists = System.IO.File.Exists(Path.Combine(fullPath, fullFileName));
                }

                using (var fileStream = new FileStream(Path.Combine(fullPath, fullFileName), FileMode.Create, FileAccess.Write))
                {
                    image.CopyTo(fileStream);

                    Fabric fabricToCreate = new Fabric();
                    Picture pictureExists = db.Picture
                    .Where(p => p.PictureName == fullFileName)
                    .FirstOrDefault();

                    if (pictureExists == null)
                    {
                        Picture picture = new Picture(0, fullFileName);
                        db.Picture.Add(picture);
                        fabric.PictureId = picture.PictureId;
                        fabric.Picture = picture;
                    }
                    else
                    {
                        fabric.PictureId = pictureExists.PictureId;
                        fabric.Picture = pictureExists;
                    }
                    db.Fabric.Add(fabric);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch
            {
                throw;
            }
        }

        public int UpdateFabric(Fabric fabric, IFormFile image, string imageChanged)
        {
            try
            {
                if (imageChanged.Equals("false"))
                {
                    Fabric oldFabric = db.Fabric.Find(fabric.FabricId);
                    fabric.PictureId = oldFabric.PictureId;
                    db.Entry(oldFabric).State = EntityState.Detached;
                    db.Entry(fabric).State = EntityState.Modified;
                    db.SaveChanges();
                    return 1;
                }
                else
                {

                    var dir = _env.ContentRootPath;

                    string pathToReferencePictures = "/ClientApp/src/assets/fabric_pictures";

                    string fullPath = dir + pathToReferencePictures;

                    if (!Directory.Exists(fullPath))
                    {
                        Directory.CreateDirectory(fullPath);
                    }

                    int fileSuffix = 1;

                    string fullFileName = "fabric_picture_" + fileSuffix + ".png";

                    bool exists = File.Exists(Path.Combine(fullPath, fullFileName));

                    while (exists)
                    {
                        fileSuffix++;
                        fullFileName = "fabric_picture_" + fileSuffix + ".png";
                        exists = System.IO.File.Exists(Path.Combine(fullPath, fullFileName));
                    }

                    using (var fileStream = new FileStream(Path.Combine(fullPath, fullFileName), FileMode.Create, FileAccess.Write))
                    {
                        image.CopyTo(fileStream);
                        Picture pictureExists = db.Picture
                        .Where(p => p.PictureName == fullFileName)
                        .FirstOrDefault();

                        if (pictureExists == null)
                        {
                            Picture picture = new Picture(0, fullFileName);
                            db.Picture.Add(picture);
                            fabric.PictureId = picture.PictureId;
                            fabric.Picture = picture;
                        }
                        else
                        {
                            fabric.PictureId = pictureExists.PictureId;
                            fabric.Picture = pictureExists;
                        }
                        db.Entry(fabric).State = EntityState.Modified;

                        db.SaveChanges();
                        return 1;
                    }
                }

            }
            catch
            {
                throw;
            }
        }

        public Fabric GetFabricDetails(int id)
        {
            try
            {
                Fabric fabric = db.Fabric.Find(id);
                return fabric;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<Fabric> GetAllFabricsByTypeId(int fabricTypeId)
        {
            try
            {
                IEnumerable<Fabric> fabricsWithType = db.Fabric.ToList().Where(f => f.FabricTypeId == fabricTypeId);
                return fabricsWithType;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteFabric(int id)
        {
            try
            {
                var dir = _env.ContentRootPath;

                string pathToFabricPictures = "/ClientApp/src/assets/fabric_pictures";

                string fullPath = dir + pathToFabricPictures;

                Picture picture = db.Picture.Find(db.Fabric.Find(id).PictureId);
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
