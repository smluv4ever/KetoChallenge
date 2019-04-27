using System.Collections.Generic;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IRegisterService
    {
        void Delete(int id);
        int Insert(RegisterAddRequest model);
        List<RegisterDomain> SelectAll();
        RegisterDomain SelectById(int id);
        void Update(RegisterUpdateRequest model);
    }
}