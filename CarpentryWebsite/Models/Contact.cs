using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class Contact
    {
        public int ContactId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string EmailAddress { get; set; }
    }
}
