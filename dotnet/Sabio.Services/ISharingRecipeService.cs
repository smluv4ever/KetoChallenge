using System.Collections.Generic;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface ISharingRecipeService
    {
        void Delete(int id);
        int Insert(SharingRecipeAddRequest model);
        List<SharingRecipeDomain> SelectAll();
        SharingRecipeDomain SelectById(int id);
        void Update(SharingRecipeUpdateRequest model);
    }
}