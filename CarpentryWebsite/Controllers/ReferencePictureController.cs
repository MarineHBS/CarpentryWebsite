using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CarpentryWebsite.Models;
using System.Web;
using System.Web.Http;
using System.IO;
using System;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;

namespace CarpentryWebsite.Controllers
{
    //[Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    public class ReferencePictureController : Controller
    { 
        private readonly UserManager<MyUser> _userManager;

        private IHostingEnvironment _env;

        ReferencePictureService referencePictureService;

        public ReferencePictureController(UserManager<MyUser> userManager, IHostingEnvironment env)
        {
            
            _userManager = userManager;
            _env = env;
            referencePictureService = new ReferencePictureService(_userManager, _env);
        }

        [HttpGet]
        [Route("/api/reference-picture/get")]
        public IEnumerable<ReferencePicture> GetReferencePictures()
        {
            return referencePictureService.GetAllReferencePictures();
        }

        [HttpGet]
        [Route("/api/reference-picture/get-pictures")]
        public IEnumerable<Picture> GetAllReferencePicturesWithUrl()
        {
            return referencePictureService.GetAllReferencePicturesWithUrl();
        }

        [HttpPost]
        [Route("/api/reference-picture/create")]
        public int Create([FromBody] Picture picture)
        {
            //return referencePictureService.AddReferencePicture(picture);
            return -1;
        }

        [HttpPost]
        [Route("/api/reference-picture/upload")]
        public int Upload(IFormFile image)
        {
            return referencePictureService.AddReferencePicture(image);
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