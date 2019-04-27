using System.Collections.Generic;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface ILoginService
    {
        LoginDomain checkLogin(string userName, string password);
        void Delete(int id);
        int Insert(LoginAddRequest model);
        bool Login(LoginDomain model);
        List<LoginDomain> SelectAll();
        LoginDomain SelectByUserName(string userName);
        void Update(LoginUpdateRequest model);
    }
}