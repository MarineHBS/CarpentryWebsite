using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using CarpentryWebsite.Models;

namespace CarpentryWebsite.Models
{
    public partial class MyUser : IdentityUser
    {
        public MyUser() : base() { }
        public bool isAdmin { get; set; }
    }
}
