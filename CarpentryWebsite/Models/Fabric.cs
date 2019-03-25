using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class Fabric
    {
        public int FabricId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int FabricTypeId { get; set; }
        public FabricType FabricType { get; set; }
        public int PictureId { get; set; }
        public Picture Picture { get; set; }
    }
}
