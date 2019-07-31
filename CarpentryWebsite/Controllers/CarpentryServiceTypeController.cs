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

namespace CarpentryWebsite.Controllers
{
    //[Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    public class CarpentryServiceTypeController : Controller
    {
        CarpentryServiceTypeService carpentryServiceTypeService = new CarpentryServiceTypeService();

        private readonly UserManager<MyUser> _userManager;

        public CarpentryServiceTypeController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/carpentry-service-type/get")]
        public IEnumerable<CarpentryServiceType> GetCarpentryServiceTypes()
        {
            return carpentryServiceTypeService.GetAllCarpentryServiceTypes();
        }

        [HttpPost]
        [Route("/api/carpentry-service-type/create")]
        public int Create([FromBody] CarpentryServiceType carpentryServiceType)
        {
            return carpentryServiceTypeService.AddCarpentryServiceType(carpentryServiceType);
        }

        [HttpGet]
        [Route("/api/carpentry-service-type/details/{id}")]
        public CarpentryServiceType GetCarpentryServiceType(int id)
        {
            return carpentryServiceTypeService.GetCarpentryServiceTypeDetails(id);
        }

        [HttpPut]
        [Route("/api/carpentry-service-type/edit")]
        public int Edit([FromBody]CarpentryServiceType carpentryServiceType)
        {
            return carpentryServiceTypeService.UpdateCarpentryServiceType(carpentryServiceType);
        }

        [HttpDelete]
        [Route("/api/carpentry-service-type/delete/{id}")]
        public int Delete(int id)
        {
            return carpentryServiceTypeService.DeleteCarpentryServiceType(id);
        }
    }
}