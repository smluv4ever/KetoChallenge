using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class LoginService : ILoginService
    {
        private IDataProvider _dataProvider;
        private IAuthenticationService<int> _authService;

        public LoginService(IDataProvider dataProvider, IAuthenticationService<int> authService)
        {
            _dataProvider = dataProvider;
            _authService = authService;
        }

        public int Insert(LoginAddRequest model)
        {
            int id = 0;

            _dataProvider.ExecuteNonQuery(
                "dbo.Login_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    SqlParameter parm = new SqlParameter();
                    parm.ParameterName = "@LoginId";
                    parm.SqlDbType = System.Data.SqlDbType.Int;
                    parm.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(parm);

                    paramCol.AddWithValue("@UserName", model.UserName);
                    paramCol.AddWithValue("@Password", model.Password);
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    Int32.TryParse(paramCol["@LoginId"].Value.ToString(), out id);
                });
            return id;
        }

        public List<LoginDomain> SelectAll()
        {
            List<LoginDomain> result = new List<LoginDomain>();
            _dataProvider.ExecuteCmd(
                "dbo.Login_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    LoginDomain model = Mapper(reader);
                    result.Add(model);
                });
            return result;
        }

        public LoginDomain SelectByUserName(string userName)
        {
            LoginDomain model = null;
            _dataProvider.ExecuteCmd(
                "dbo.Login_SelectByUserName",
                inputParamMapper: delegate (SqlParameterCollection paramcol)
                {
                    paramcol.AddWithValue("@UserName", model.UserName);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = Mapper(reader);
                });
            return model;
        }

        public LoginDomain checkLogin(string userName, string password)
        {
            LoginDomain model = null;
            _dataProvider.ExecuteCmd(
                "dbo.Login_checkLogin",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@UserName", userName);
                    paramCol.AddWithValue("@Password", password);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = Mapper(reader);
                });
            return model;
        }

        public bool Login(LoginDomain model)
        {
            bool isSuccessful = false;
            try
            {
                IUserAuthData result = new UserBase
                {
                    Id = model.LoginId,
                    TenantId = "User" + model.LoginId
                };
                Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
                Task loginTask = _authService.LogInAsync(result, new Claim[] { fullName });
                loginTask.Wait();
                if (loginTask.IsCompletedSuccessfully)
                {
                    isSuccessful = true;
                }
            }
            catch (Exception excption)
            {
                throw excption;
            }
            return isSuccessful;
        }

        public void Update(LoginUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Login_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@LoginId", model.LoginId);
                    paramCol.AddWithValue("@UserName", model.UserName);
                    paramCol.AddWithValue("@Password", model.Password);
                });
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Login_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@LoginId", id);
                });
        }

        private LoginDomain Mapper(IDataReader reader)
        {
            LoginDomain model = new LoginDomain();
            int index = 0;
            model.LoginId = reader.GetSafeInt32(index++);
            model.UserName = reader.GetSafeString(index++);
            model.Password = reader.GetSafeString(index++);
            return model;
        }
    }
}