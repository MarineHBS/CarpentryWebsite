using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class CarpentryServiceType
    {
        public int CarpentryServiceTypeId { get; set; }
        public string Name { get; set; }
        public ICollection<CarpentryService> CarpentryServices { get; set; }
    }
}
