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
    public class ReferencePictureService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public ReferencePictureService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public ReferencePictureService()
        {
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

        public int AddReferencePicture(Picture picture)
        {
            try
            {
                ReferencePicture referencePicture = new ReferencePicture();
                Picture exists = db.Picture.Where(p => p.PictureUrl == picture.PictureUrl).FirstOrDefault();

                if (exists == null)
                {
                    db.Picture.Add(picture);
                    referencePicture.PictureId = picture.PictureId;
                    referencePicture.Picture = picture;
                }
                else
                {
                    Console.WriteLine(picture.PictureId);
                    referencePicture.PictureId = exists.PictureId;
                    referencePicture.Picture = exists;
                }
                

                db.ReferencePicture.Add(referencePicture);
                db.SaveChanges();
                return 1;
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
                ReferencePicture referencePicture = db.ReferencePicture.Find(id);
                db.ReferencePicture.Remove(referencePicture);
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
