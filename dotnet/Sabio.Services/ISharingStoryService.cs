using System.Collections.Generic;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface ISharingStoryService
    {
        void Delete(int id);
        int Insert(SharingStoryAddRequest model);
        List<SharingStoryDomain> SelectAll();
        SharingStoryDomain SelectById(int id);
        void Update(SharingStoryUpdateRequest model);
    }
}