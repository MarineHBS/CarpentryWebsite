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
    public class ContactController : Controller
    {
        ContactService contactService = new ContactService();

        private readonly UserManager<MyUser> _userManager;

        public ContactController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("/api/contact/get")]
        public IEnumerable<Contact> GetAllLocations()
        {
            return contactService.GetAllContacts();
        }

        [HttpPost]
        [Route("/api/contact/create")]
        public int Create([FromBody] Contact contact)
        {
            return contactService.AddContact(contact);
        }

        [HttpGet]
        [Route("/api/contact/details/{id}")]
        public Contact GetContact(int id)
        {
            return contactService.GetContactDetails(id);
        }

        [HttpPut]
        [Route("/api/contact/edit")]
        public int Edit([FromBody]Contact contact)
        {
            return contactService.UpdateContact(contact);
        }

        [HttpDelete]
        [Route("/api/contact/delete/{id}")]
        public int Delete(int id)
        {
            return contactService.DeleteContact(id);
        }
    }
}