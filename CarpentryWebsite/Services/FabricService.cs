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
    public class FabricService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public FabricService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
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

        public int AddFabric(Fabric fabric, string pictureUrl)
        {
            try
            {
                Picture exists = db.Picture.Where(p => p.PictureUrl == pictureUrl).FirstOrDefault();

                if (exists == null)
                {
                    Picture p = new Picture();
                    p.PictureUrl = pictureUrl;
                    db.Picture.Add(p);
                    fabric.PictureId = p.PictureId;
                    fabric.Picture = p;
                }
                else
                {
                    fabric.PictureId = exists.PictureId;
                    fabric.Picture = exists;
                }
                db.Fabric.Add(fabric);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateFabric(Fabric fabric)
        {
            try
            {
                db.Entry(fabric).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
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
                Fabric fabric = db.Fabric.Find(id);
                db.Fabric.Remove(fabric);
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
