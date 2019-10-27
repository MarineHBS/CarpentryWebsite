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
    public class CarpentryServiceTypeService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public CarpentryServiceTypeService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public CarpentryServiceTypeService()
        {
        }
        public CarpentryServiceTypeService(CarpentryWebsiteContext carpentryWebsiteContext)
        {
            db = carpentryWebsiteContext;
        }

        public IEnumerable<CarpentryServiceType> GetAllCarpentryServiceTypes()
        {
            try{
                return db.CarpentryServiceType.ToList();
            }catch{
                throw;
            }
        }

        public int AddCarpentryServiceType(CarpentryServiceType carpentryServiceType)
        {
            try
            {
                db.CarpentryServiceType.Add(carpentryServiceType);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateCarpentryServiceType(CarpentryServiceType carpentryServiceType)
        {
            try
            {
                db.Entry(carpentryServiceType).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public CarpentryServiceType GetCarpentryServiceTypeDetails(int id)
        {
            try
            {
                CarpentryServiceType carpentryServiceType = db.CarpentryServiceType.Find(id);
                return carpentryServiceType;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteCarpentryServiceType(int id)
        {
            try
            {
                CarpentryServiceType carpentryServiceType = db.CarpentryServiceType.Find(id);
                db.CarpentryServiceType.Remove(carpentryServiceType);
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
