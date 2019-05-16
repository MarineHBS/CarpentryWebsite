using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class CarpentryService
    {
        public int CarpentryServiceId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int CarpentryServiceTypeId {get; set;}
        public CarpentryServiceType CarpentryServiceType { get; set; }
        public int? PictureId { get; set; }
        public Picture Picture { get; set; }
    }
}
