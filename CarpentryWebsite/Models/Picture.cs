using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Models
{
    public class Picture
    {
        public int PictureId { get; set; }
        public string PictureName { get; set; }
        public string PictureUrl { get; set; }
        public ICollection<CarpentryService> CarpentryServices { get; set; }
        public ICollection<Fabric> Fabrics { get; set; }
        public ICollection<ReferencePicture> ReferencePictures { get; set; }
        public ICollection<OfferRequest> OfferRequests { get; set; }

        public Picture(int pictureId, string pictureName)
        {
            PictureId = pictureId;
            PictureName = pictureName;
        }

        public Picture() { }
    }
}
