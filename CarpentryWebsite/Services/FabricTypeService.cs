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
    public class FabricTypeService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public FabricTypeService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public FabricTypeService()
        {
        }

        public IEnumerable<FabricType> GetAllFabricTypes()
        {
            try{
                return db.FabricType.ToList();
            }catch{
                throw;
            }
        }

        public int AddFabricType(FabricType fabricType)
        {
            try
            {
                db.FabricType.Add(fabricType);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateFabricType(FabricType fabricType)
        {
            try
            {
                db.Entry(fabricType).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public FabricType GetFabricTypeDetails(int id)
        {
            try
            {
                FabricType fabricType = db.FabricType.Find(id);
                return fabricType;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteFabricType(int id)
        {
            try
            {
                FabricType fabricType = db.FabricType.Find(id);
                db.FabricType.Remove(fabricType);
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
