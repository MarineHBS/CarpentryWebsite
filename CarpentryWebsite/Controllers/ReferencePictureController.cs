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
    public class ReferencePictureController : Controller
    {
        ReferencePictureService referencePictureService = new ReferencePictureService();

        private readonly UserManager<MyUser> _userManager;

        public ReferencePictureController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/reference-picture/get")]
        public IEnumerable<ReferencePicture> GetAllLocations()
        {
            return referencePictureService.GetAllReferencePictures();
        }

        [HttpPost]
        [Route("/api/reference-picture/create")]
        public int Create([FromBody] ReferencePicture referencePicture)
        {
            return referencePictureService.AddReferencePicture(referencePicture);
        }

        [HttpGet]
        [Route("/api/reference-picture/details/{id}")]
        public ReferencePicture GetReferencePicture(int id)
        {
            return referencePictureService.GetReferencePictureDetails(id);
        }

        [HttpPut]
        [Route("/api/reference-picture/edit")]
        public int Edit([FromBody]ReferencePicture referencePicture)
        {
            return referencePictureService.UpdateReferencePicture(referencePicture);
        }

        [HttpDelete]
        [Route("/api/reference-picture/delete/{id}")]
        public int Delete(int id)
        {
            return referencePictureService.DeleteReferencePicture(id);
        }
    }
}