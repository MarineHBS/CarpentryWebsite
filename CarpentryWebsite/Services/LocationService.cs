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
    public class LocationService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public LocationService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public LocationService()
        {
        }

        public IEnumerable<Location> GetAllLocations()
        {
            try{
                return db.Location.ToList();
            }catch{
                throw;
            }
        }

        public IEnumerable<Location> GetAllFavorites(string userId)
        {
            try
            {
                var favoriteLocationIds = db.Favorite.Where(f => f.UserId == userId).Select(f => f.LocationID);
                List<Location> favoriteLocations = new List<Location>();
                
                foreach (var favLocationId in favoriteLocationIds)
                {
                    
                    favoriteLocations.Add(db.Location.Find(favLocationId));
                    
                }
                return favoriteLocations;
            }
            catch
            {
                throw;
            }
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

        public int AddLocation(Location location)
        {
            try
            {
                db.Location.Add(location);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int AddToFavorites(int locationID, string userId)
        {
            try
            {
                Favorite favoriteToAdd = new Favorite();
                favoriteToAdd.LocationID = locationID;
                favoriteToAdd.UserId = userId;
                var exists = db.Favorite.Where(f => f.UserId == userId && f.LocationID == locationID).Select(f => f.ID);
                if (exists.ToList().Count == 0)
                {
                    db.Favorite.Add(favoriteToAdd);
                    db.SaveChanges();
                    return 1;
                }
                return -1;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteFromFavorites(int locationID, string userId)
        {
            try
            {
                var favorite = db.Favorite.Where(f => f.LocationID == locationID && f.UserId == userId);
                Console.WriteLine(favorite);
                db.Favorite.RemoveRange(favorite);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateLocation(Location location)
        {
            try
            {
                db.Entry(location).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Location GetLocationDetails(int id)
        {
            try
            {
                Location location = db.Location.Find(id);
                return location;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteLocation(int id)
        {
            try
            {
                Location location = db.Location.Find(id);
                db.Location.Remove(location);
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
