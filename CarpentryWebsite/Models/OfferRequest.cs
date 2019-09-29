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
        public int? PictureId { get; set; }
        public Picture Picture { get; set; }

        public OfferRequest() { }

        public OfferRequest(string name, string emailAddress, string message)
        {
            Name = name;
            EmailAddress = emailAddress;
            Message = message;
        }
    }
}
