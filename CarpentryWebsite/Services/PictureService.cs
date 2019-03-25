using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CarpentryWebsite.Models;

namespace CarpentryWebsite.Models
{
    public class PictureService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public PictureService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public PictureService()
        {
        }

        public IEnumerable<Picture> GetAllPictures()
        {
            try{
                return db.Picture.ToList();
            }catch{
                throw;
            }
        }

        public int AddPicture(Picture picture)
        {
            try
            {
                db.Picture.Add(picture);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdatePicture(Picture picture)
        {
            try
            {
                db.Entry(picture).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Picture GetPictureDetails(int id)
        {
            try
            {
                Picture picture = db.Picture.Find(id);
                return picture;
            }
            catch
            {
                throw;
            }
        }

        public int DeletePicture(int id)
        {
            try
            {
                Picture picture = db.Picture.Find(id);
                db.Picture.Remove(picture);
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
