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
    public class RatingController : Controller
    {
        RatingService ratingService = new RatingService();

        private readonly UserManager<MyUser> _userManager;

        public RatingController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/rating/get")]
        public IEnumerable<Rating> GetAllLocations()
        {
            return ratingService.GetAllRatings();
        }

        [HttpPost]
        [Route("/api/rating/create")]
        public int Create([FromBody] Rating rating)
        {
            return ratingService.AddRating(rating);
        }

        [HttpGet]
        [Route("/api/rating/details/{id}")]
        public Rating GetRating(int id)
        {
            return ratingService.GetRatingDetails(id);
        }

        [HttpPut]
        [Route("/api/rating/edit")]
        public int Edit([FromBody]Rating rating)
        {
            return ratingService.UpdateRating(rating);
        }

        [HttpDelete]
        [Route("/api/rating/delete/{id}")]
        public int Delete(int id)
        {
            return ratingService.DeleteRating(id);
        }
    }
}