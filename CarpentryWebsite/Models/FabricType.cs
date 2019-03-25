using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class FabricType
    {

        public int FabricTypeId { get; set; }
        public string Name { get; set; }
        public ICollection<Fabric> Fabrics { get; set; }
    }
}
