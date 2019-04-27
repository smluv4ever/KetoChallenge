using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class RegisterService : IRegisterService
    {
        private IDataProvider _dataProvider;

        public RegisterService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(RegisterAddRequest model)
        {
            int id = 0;

            _dataProvider.ExecuteNonQuery(
                "dbo.Register_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    SqlParameter parm = new SqlParameter();
                    parm.ParameterName = "@RegisterId";
                    parm.SqlDbType = System.Data.SqlDbType.Int;
                    parm.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(parm);

                    paramCol.AddWithValue("@UserName", model.UserName);
                    paramCol.AddWithValue("@Password", model.Password);
                    paramCol.AddWithValue("@ConfirmPassword", model.ConfirmPassword);
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    Int32.TryParse(paramCol["@RegisterId"].Value.ToString(), out id);
                });
            return id;
        }

        public List<RegisterDomain> SelectAll()
        {
            List<RegisterDomain> result = new List<RegisterDomain>();
            _dataProvider.ExecuteCmd(
                "dbo.Register_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    RegisterDomain model = Mapper(reader);
                    result.Add(model);
                });
            return result;
        }

        public RegisterDomain SelectById(int id)
        {
            RegisterDomain model = null;
            _dataProvider.ExecuteCmd(
                "dbo.Register_SelectById",
                inputParamMapper: delegate (SqlParameterCollection paramcol)
                {
                    paramcol.AddWithValue("@RegisterId", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = Mapper(reader);
                });
            return model;
        }

        public void Update(RegisterUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Register_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@RegisterId", model.RegisterId);
                    paramCol.AddWithValue("@UserName", model.UserName);
                    paramCol.AddWithValue("@Password", model.Password);
                    paramCol.AddWithValue("@ConfirmPassword", model.ConfirmPassword);
                });
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Register_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@RegisterId", id);
                });
        }

        private RegisterDomain Mapper(IDataReader reader)
        {
            RegisterDomain model = new RegisterDomain();
            int index = 0;
            model.RegisterId = reader.GetSafeInt32(index++);
            model.UserName = reader.GetSafeString(index++);
            model.Password = reader.GetSafeString(index++);
            model.ConfirmPassword = reader.GetSafeString(index++);
            return model;
        }
    }
}