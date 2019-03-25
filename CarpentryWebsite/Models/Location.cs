using System;
using System.Collections.Generic;
using CarpentryWebsite.Models;

namespace CarpentryWebsite.Models
{
    public partial class Location
    {
        public int LocationId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public IEnumerable<Favorite> FavoritedBy { get; set; }
    }
}
