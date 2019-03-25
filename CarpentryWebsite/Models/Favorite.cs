using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarpentryWebsite.Models;

namespace CarpentryWebsite.Models
{
    public class Favorite
    {
        public int ID { get; set; }
        public int LocationID { get; set; }
        public string UserId { get; set; }
        public MyUser User { get; set; }
        public Location Location { get; set; }
    }
}
