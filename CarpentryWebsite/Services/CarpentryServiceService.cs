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
    public class CarpentryServiceService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public CarpentryServiceService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public CarpentryServiceService()
        {
        }
        public CarpentryServiceService(CarpentryWebsiteContext carpentryWebsiteContext)
        {
            db = carpentryWebsiteContext;
        }

        public bool adminFlag(string userId)
        {
            try
            {
                return db.Users.Find(userId).isAdmin;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<CarpentryService> GetAllCarpentryServices()
        {
            try{
                return db.CarpentryService.ToList();
            }catch{
                throw;
            }
        }

        public int AddCarpentryService(CarpentryService carpentryService)
        {
            try
            {
                db.CarpentryService.Add(carpentryService);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateCarpentryService(CarpentryService carpentryService)
        {
            try
            {
                db.Entry(carpentryService).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public CarpentryService GetCarpentryServiceDetails(int id)
        {
            try
            {
                CarpentryService carpentryService = db.CarpentryService.Find(id);
                return carpentryService;
            }
            catch
            {
                throw;
            }
        }
        //Returns all carpentryservices that have a foreign key to the carpentryservicetypeid parameter
        public IEnumerable<CarpentryService> GetAllCarpentryServicesByTypeId(int carpentryServiceTypeId)
        {
            try
            {
                IEnumerable<CarpentryService> servicesWithType = db.CarpentryService.ToList().Where(cs => cs.CarpentryServiceTypeId == carpentryServiceTypeId);
                return servicesWithType;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteCarpentryService(int id)
        {
            try
            {
                CarpentryService carpentryService = db.CarpentryService.Find(id);
                db.CarpentryService.Remove(carpentryService);
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
