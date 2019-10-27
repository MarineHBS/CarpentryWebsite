using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class RatingService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;
        

        public RatingService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public RatingService()
        {
        }
        public RatingService(CarpentryWebsiteContext carpentryWebsiteContext)
        {
            db = carpentryWebsiteContext;
        }

        public IEnumerable<Rating> GetAllRatings()
        {
            try{
                return db.Rating.ToList();
            }catch{
                throw;
            }
        }

        public int AddRating(Rating rating)
        {
            try
            {
                db.Rating.Add(rating);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateRating(Rating rating)
        {
            try
            {
                db.Entry(rating).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Rating GetRatingDetails(int id)
        {
            try
            {
                Rating rating = db.Rating.Find(id);
                return rating;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteRating(int id)
        {
            try
            {
                Rating rating = db.Rating.Find(id);
                db.Rating.Remove(rating);
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
