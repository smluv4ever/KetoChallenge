using System.Collections.Generic;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IAdvertisersService
    {
        void Delete(int id);
        int Insert(AdvertisersAddRequest model);
        List<AdvertisersDomain> SelectAll();
        AdvertisersDomain SelectById(int id);
        void Update(AdvertisersUpdateRequest model);
    }
}