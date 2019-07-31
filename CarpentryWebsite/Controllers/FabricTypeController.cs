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
    public class FabricTypeController : Controller
    {
        FabricTypeService fabricTypeService = new FabricTypeService();

        private readonly UserManager<MyUser> _userManager;

        public FabricTypeController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/fabric-type/get")]
        public IEnumerable<FabricType> GetFabricTypes()
        {
            return fabricTypeService.GetAllFabricTypes();
        }

        [HttpPost]
        [Route("/api/fabric-type/create")]
        public int Create([FromBody] FabricType fabricType)
        {
            return fabricTypeService.AddFabricType(fabricType);
        }

        [HttpGet]
        [Route("/api/fabric-type/details/{id}")]
        public FabricType GetFabricType(int id)
        {
            return fabricTypeService.GetFabricTypeDetails(id);
        }

        [HttpPut]
        [Route("/api/fabric-type/edit")]
        public int Edit([FromBody]FabricType fabricType)
        {
            return fabricTypeService.UpdateFabricType(fabricType);
        }

        [HttpDelete]
        [Route("/api/fabric-type/delete/{id}")]
        public int Delete(int id)
        {
            return fabricTypeService.DeleteFabricType(id);
        }
    }
}