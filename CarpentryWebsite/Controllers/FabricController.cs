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
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace CarpentryWebsite.Controllers
{
    //[Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    public class FabricController : Controller
    {
        FabricService fabricService;

        private IHostingEnvironment _env;

        private readonly UserManager<MyUser> _userManager;

        public FabricController(UserManager<MyUser> userManager, IHostingEnvironment env)
        {
            _userManager = userManager;
            _env = env;
            fabricService = new FabricService(_userManager, _env);
        }

        [HttpGet]
        [Route("/api/fabric/get")]
        public IEnumerable<Fabric> GetAllFabrics()
        {
            return fabricService.GetAllFabrics();
        }


        [HttpGet]
        [Route("/api/fabric/get-type/{id}")]
        public IEnumerable<Fabric> GetAllFabricsByTypeId(int id)
        {
            return fabricService.GetAllFabricsByTypeId(id);
        }

        [HttpGet]
        [Route("/api/fabric/get-url")]
        public IEnumerable<Picture> GetFabricPictureUrl()
        {
            return fabricService.GetFabricsPictureUrl();
        }

        [HttpPost]
        [Route("/api/fabric/create")]
        public int Create(IFormFile image, string fabricId, string fabricTypeId, string fabricName, string price)
        {
            Fabric fabric = new Fabric(int.Parse(fabricId), fabricName, int.Parse(price), int.Parse(fabricTypeId));
            
            return fabricService.AddFabric(fabric, image);
        }

        [HttpGet]
        [Route("/api/fabric/details/{id}")]
        public Fabric GetFabric(int id)
        {
            return fabricService.GetFabricDetails(id);
        }

        [HttpPut]
        [Route("/api/fabric/edit")]
        public int Edit(IFormFile image, string imageChanged, string fabricId, string fabricTypeId, string fabricName, string price)
        {

            Fabric fabric = new Fabric(int.Parse(fabricId), fabricName, int.Parse(price), int.Parse(fabricTypeId));

            return fabricService.UpdateFabric(fabric, image, imageChanged);
        }

        [HttpDelete]
        [Route("/api/fabric/delete/{id}")]
        public int Delete(int id)
        {
            return fabricService.DeleteFabric(id);
        }
    }
}