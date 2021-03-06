﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using CarpentryWebsite.Models;
using CarpentryWebsite.Helpers;

namespace CarpentryWebsite.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {

        private readonly UserManager<MyUser> _userManager;

        public AccountController(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("/api/register")]
        [AllowAnonymous]
        public async Task<ActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var _context = new CarpentryWebsiteContext();
                var user = new MyUser() { UserName = model.UserName, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return new OkObjectResult("Account created");
                }
                else
                {
                    ResultMapper resultMapper = new ResultMapper();
                    string beautifiedErrorMessage = resultMapper.BeautifyErrorMessage(result.ToString());
                    return BadRequest(Errors.AddErrorToModelState("register_failure", beautifiedErrorMessage, ModelState));
                }
            }
            return new BadRequestObjectResult("Model state error: " + ModelState);
        }
    }
}
