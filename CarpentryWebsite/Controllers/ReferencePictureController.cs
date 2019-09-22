using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CarpentryWebsite.Models;
using System.Web;
using System.Web.Http;
using System.IO;
using System;

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
            return referencePictureService.AddReferencePicture(picture);
        }

        [HttpPost]
        [Route("/api/reference-picture/upload")]
        public int Upload()
        {
            string imageName = null;

            Console.WriteLine("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

            // TODO: Save uploaded image to assets
            /*
            var httpRequest = HttpContext.Current.Request;
        
            var postedFile = httpRequest.Files["image"];

            var filePath = HttpContext.Current.Server.MapPath("~/assets/reference-pictures/" + imageName);
            postedFile.SaveAs(filePath);
            */

            return -1;
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