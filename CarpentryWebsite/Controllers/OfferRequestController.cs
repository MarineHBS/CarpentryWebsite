using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CarpentryWebsite.Models;
using CarpentryWebsite.Services;

namespace CarpentryWebsite.Controllers
{
        //[Authorize(Policy = "ApiUser")]
        [Route("api/[controller]")]
        public class OfferRequestController : Controller
        {
            OfferRequestService offerRequestService = new OfferRequestService();

            private readonly UserManager<MyUser> _userManager;

            public OfferRequestController(UserManager<MyUser> userManager)
            {
                _userManager = userManager;
            }

            [HttpGet]
            [Route("/api/offer-request/get")]
            public IEnumerable<OfferRequest> GetAllOfferRequests()
            {
                return offerRequestService.GetAllOfferRequests();
            }

            [HttpPost]
            [Route("/api/offer-request/create")]
            public int Create([FromBody] OfferRequest offerRequest)
            {
                return offerRequestService.AddOfferRequest(offerRequest);
            }

            [HttpGet]
            [Route("/api/offer-request/details/{id}")]
            public OfferRequest GetOfferRequest(int id)
            {
                return offerRequestService.GetOfferRequestDetails(id);
            }

            [HttpPut]
            [Route("/api/offer-request/edit")]
            public int Edit([FromBody]OfferRequest offerRequest)
            {
                return offerRequestService.UpdateOfferRequest(offerRequest);
            }

            [HttpDelete]
            [Route("/api/offer-request/delete/{id}")]
            public int Delete(int id)
            {
                return offerRequestService.DeleteOfferRequest(id);
            }
        }
}
