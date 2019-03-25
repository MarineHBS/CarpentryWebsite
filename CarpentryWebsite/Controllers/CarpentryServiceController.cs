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
using CarpentryWebsite.Models;

namespace CarpentryWebsite.Controllers
{
    //[Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    public class CarpentryServiceController : Controller
    {
        CarpentryServiceService carpentryServiceService = new CarpentryServiceService();

        private readonly UserManager<MyUser> _userManager;

        public CarpentryServiceController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/carpentry-service/get")]
        public IEnumerable<CarpentryService> GetAllCarpentryServices()
        {
            return carpentryServiceService.GetAllCarpentryServices();
        }

        [HttpGet]
        [Route("/api/carpentry-service/get-type/{id}")]
        public IEnumerable<CarpentryService> GetAllCarpentryServicesByTypeId(int id)
        {
            return carpentryServiceService.GetAllCarpentryServicesByTypeId(id);
        }

        [HttpPost]
        [Route("/api/carpentry-service/create")]
        public int Create([FromBody] CarpentryService carpentryService)
        {
            return carpentryServiceService.AddCarpentryService(carpentryService);
        }

        [HttpGet]
        [Route("/api/carpentry-service/details/{id}")]
        public CarpentryService GetCarpentryService(int id)
        {
            return carpentryServiceService.GetCarpentryServiceDetails(id);
        }

        [HttpPut]
        [Route("/api/carpentry-service/edit")]
        public int Edit([FromBody]CarpentryService carpentryService)
        {
            return carpentryServiceService.UpdateCarpentryService(carpentryService);
        }

        [HttpDelete]
        [Route("/api/carpentry-service/delete/{id}")]
        public int Delete(int id)
        {
            return carpentryServiceService.DeleteCarpentryService(id);
        }
    }
}