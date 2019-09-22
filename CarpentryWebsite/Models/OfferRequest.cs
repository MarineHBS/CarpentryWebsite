using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class OfferRequest
    {
        public int OfferRequestId { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string Message { get; set; }
        public string Picture { get; set; }
    }
}
