using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class ReferencePicture
    {
        public int ReferencePictureId { get; set; }

        //public string Name { get; set; }
        public int PictureId { get; set; }
        public Picture Picture { get; set; }
    }
}
