using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public string User { get; set; }
        public string UserRating { get; set; }
        public string Text { get; set; }
    }
}
