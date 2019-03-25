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
    public class PictureController : Controller
    {
        PictureService pictureService = new PictureService();

        private readonly UserManager<MyUser> _userManager;

        public PictureController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/picture/get")]
        public IEnumerable<Picture> GetAllLocations()
        {
            return pictureService.GetAllPictures();
        }

        [HttpPost]
        [Route("/api/picture/create")]
        public int Create([FromBody] Picture picture)
        {
            return pictureService.AddPicture(picture);
        }

        [HttpGet]
        [Route("/api/picture/details/{id}")]
        public Picture GetPicture(int id)
        {
            return pictureService.GetPictureDetails(id);
        }

        [HttpPut]
        [Route("/api/picture/edit")]
        public int Edit([FromBody]Picture picture)
        {
            return pictureService.UpdatePicture(picture);
        }

        [HttpDelete]
        [Route("/api/picture/delete/{id}")]
        public int Delete(int id)
        {
            return pictureService.DeletePicture(id);
        }
    }
}