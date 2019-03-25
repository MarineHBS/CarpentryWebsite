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
    public class FabricController : Controller
    {
        FabricService fabricService = new FabricService();

        private readonly UserManager<MyUser> _userManager;

        public FabricController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/fabric/get")]
        public IEnumerable<Fabric> GetAllLocations()
        {
            return fabricService.GetAllFabrics();
        }

        [HttpPost]
        [Route("/api/fabric/create")]
        public int Create([FromBody] Fabric fabric)
        {
            return fabricService.AddFabric(fabric);
        }

        [HttpGet]
        [Route("/api/fabric/details/{id}")]
        public Fabric GetFabric(int id)
        {
            return fabricService.GetFabricDetails(id);
        }

        [HttpPut]
        [Route("/api/fabric/edit")]
        public int Edit([FromBody]Fabric fabric)
        {
            return fabricService.UpdateFabric(fabric);
        }

        [HttpDelete]
        [Route("/api/fabric/delete/{id}")]
        public int Delete(int id)
        {
            return fabricService.DeleteFabric(id);
        }
    }
}