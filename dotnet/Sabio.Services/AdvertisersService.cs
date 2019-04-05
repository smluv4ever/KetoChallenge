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
    public class AdvertisersService : IAdvertisersService
    {
        private IDataProvider _dataProvider;

        public AdvertisersService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(AdvertisersAddRequest model)
        {
            int id = 0;

            _dataProvider.ExecuteNonQuery(
                "dbo.Advertisers_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    SqlParameter parm = new SqlParameter();
                    parm.ParameterName = "@Id";
                    parm.SqlDbType = System.Data.SqlDbType.Int;
                    parm.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(parm);

                    paramCol.AddWithValue("@shortTitle", model.shortTitle);
                    paramCol.AddWithValue("@title", model.title);
                    paramCol.AddWithValue("@shortDescription", model.shortDescription);
                    paramCol.AddWithValue("@content", model.content);
                    paramCol.AddWithValue("@slug", model.slug);
                    paramCol.AddWithValue("@entityTypeId", model.entityTypeId);
                    paramCol.AddWithValue("@statusId", model.statusId);
                    paramCol.AddWithValue("@modifiedBy", model.modifiedBy);
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    Int32.TryParse(paramCol["@Id"].Value.ToString(), out id);
                });
            return id;
        }

        public List<AdvertisersDomain> SelectAll()
        {
            List<AdvertisersDomain> result = new List<AdvertisersDomain>();
            _dataProvider.ExecuteCmd(
                "dbo.Advertisers_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    AdvertisersDomain model = Mapper(reader);
                    result.Add(model);
                });
            return result;
        }

        public AdvertisersDomain SelectById(int id)
        {
            AdvertisersDomain model = null;
            _dataProvider.ExecuteCmd(
                "Advertisers_SelectById",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = Mapper(reader);
                });
            return model;
        }

        public void Update(AdvertisersUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Advertisers_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@shortTitle", model.shortTitle);
                    paramCol.AddWithValue("@title", model.title);
                    paramCol.AddWithValue("@shortDescription", model.shortDescription);
                    paramCol.AddWithValue("@content", model.content);
                    paramCol.AddWithValue("@slug", model.slug);
                    paramCol.AddWithValue("@entityTypeId", model.entityTypeId);
                    paramCol.AddWithValue("@statusId", model.statusId);
                    paramCol.AddWithValue("@modifiedBy", model.modifiedBy);
                });
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Advertisers_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                });
        }

        private AdvertisersDomain Mapper(IDataReader reader)
        {
            AdvertisersDomain model = new AdvertisersDomain();
            int index = 0;
            model.Id = reader.GetSafeInt32(index++);
            model.shortTitle = reader.GetSafeString(index++);
            model.title = reader.GetSafeString(index++);
            model.shortDescription = reader.GetSafeString(index++);
            model.content = reader.GetSafeString(index++);
            model.slug = reader.GetSafeString(index++);
            model.entityTypeId = reader.GetSafeInt32(index++);
            model.statusId = reader.GetSafeInt32(index++);
            model.modifiedBy = reader.GetSafeString(index++);
            return model;
        }
    }
}