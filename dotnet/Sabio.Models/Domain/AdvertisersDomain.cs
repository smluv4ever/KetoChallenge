using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class AdvertisersDomain : AdvertisersUpdateRequest
    {
        public DateTime createdDate { get; set; }
        public DateTime modifiedDate { get; set; }
    }
}