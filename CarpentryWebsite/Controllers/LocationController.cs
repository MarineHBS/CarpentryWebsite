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
    public class LocationController : Controller
    {
        LocationService locationService = new LocationService();

        private readonly UserManager<MyUser> _userManager;

        public LocationController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/location/index")]
        public IEnumerable<Location> GetAllLocations()
        {
            return locationService.GetAllLocations();
        }

        [HttpGet]
        [Route("/api/location/favorites/{user_id}")]
        public IEnumerable<Location> GetAllFavorites(string user_id)
        {
            Debug.WriteLine("Userid is: " + user_id);
            return locationService.GetAllFavorites(user_id);
        }

        [HttpPost]
        [Route("/api/location/create")]
        public int Create([FromBody] Location location)
        {
            return locationService.AddLocation(location);
        }

        [HttpPost]
        [Route("/api/location/addFavorite/{id}")]
        public int AddToFavorite(int id, [FromBody] Id identity)
        {
            return locationService.AddToFavorites(id, identity.userId);
        }

        [HttpDelete]
        [Route("/api/location/{location_id}/user/{user_id}")]
        public int DeleteFavorite(int location_id, string user_id)
        {
            return locationService.DeleteFromFavorites(location_id, user_id);
        }

        [HttpGet]
        [Route("/api/location/details/{id}")]
        public Location GetLocation(int id)
        {
            return locationService.GetLocationDetails(id);
        }

        [HttpPut]
        [Route("/api/location/edit")]
        public int Edit([FromBody]Location location)
        {
            return locationService.UpdateLocation(location);
        }

        [HttpDelete]
        [Route("/api/location/delete/{id}")]
        public int Delete(int id)
        {
            return locationService.DeleteLocation(id);
        }
    }
}
