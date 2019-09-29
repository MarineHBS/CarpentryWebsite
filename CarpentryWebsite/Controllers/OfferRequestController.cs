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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace CarpentryWebsite.Controllers
{
        //[Authorize(Policy = "ApiUser")]
        [Route("api/[controller]")]
        public class OfferRequestController : Controller
        {
            OfferRequestService offerRequestService = new OfferRequestService();

            private readonly UserManager<MyUser> _userManager;

            private IHostingEnvironment _env;

        public OfferRequestController(UserManager<MyUser> userManager, IHostingEnvironment env)
            {
                _userManager = userManager;
                _env = env;
                offerRequestService = new OfferRequestService(_userManager, _env);
            }

            [HttpGet]
            [Route("/api/offer-request/get")]
            public IEnumerable<OfferRequest> GetAllOfferRequests()
            {
                return offerRequestService.GetAllOfferRequests();
            }

            [HttpPost]
            [Route("/api/offer-request/create")]
            public int Create(IFormFile image, string imageAdded, string name, string emailAddress, string message)
            {
            OfferRequest offerRequest = new OfferRequest(name, emailAddress, message);
                return offerRequestService.AddOfferRequest(offerRequest, image, imageAdded);
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
