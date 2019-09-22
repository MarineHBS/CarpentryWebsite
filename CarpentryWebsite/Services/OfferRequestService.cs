using CarpentryWebsite.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Services
{
    public class OfferRequestService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public OfferRequestService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public OfferRequestService()
        {
        }

        public IEnumerable<OfferRequest> GetAllOfferRequests()
        {
            try
            {
                return db.OfferRequest.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddOfferRequest(OfferRequest offerRequest)
        {
            try
            {
                db.OfferRequest.Add(offerRequest);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateOfferRequest(OfferRequest offerRequest)
        {
            try
            {
                db.Entry(offerRequest).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public OfferRequest GetOfferRequestDetails(int id)
        {
            try
            {
                OfferRequest offerRequest = db.OfferRequest.Find(id);
                return offerRequest;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteOfferRequest(int id)
        {
            try
            {
                OfferRequest offerRequest = db.OfferRequest.Find(id);
                db.OfferRequest.Remove(offerRequest);
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
