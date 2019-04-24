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
    public class SharingStoryService : ISharingStoryService
    {
        private IDataProvider _dataProvider;

        public SharingStoryService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(SharingStoryAddRequest model)
        {
            int id = 0;

            _dataProvider.ExecuteNonQuery(
                "dbo.SharingStory_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    SqlParameter parm = new SqlParameter();
                    parm.ParameterName = "@StoryId";
                    parm.SqlDbType = System.Data.SqlDbType.Int;
                    parm.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(parm);

                    paramCol.AddWithValue("@StoryTitle", model.StoryTitle);
                    paramCol.AddWithValue("@Story", model.Story);
                    paramCol.AddWithValue("@ModifiedBy", model.ModifiedBy);
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    Int32.TryParse(paramCol["@StoryId"].Value.ToString(), out id);
                });
            return id;
        }

        public List<SharingStoryDomain> SelectAll()
        {
            List<SharingStoryDomain> result = new List<SharingStoryDomain>();
            _dataProvider.ExecuteCmd(
                "dbo.SharingStory_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SharingStoryDomain model = Mapper(reader);
                    result.Add(model);
                });
            return result;
        }

        public SharingStoryDomain SelectById(int id)
        {
            SharingStoryDomain model = null;
            _dataProvider.ExecuteCmd(
                "dbo.SharingStory_SelectById",
                inputParamMapper: delegate (SqlParameterCollection paramcol)
                {
                    paramcol.AddWithValue("@RecipeId", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = Mapper(reader);
                });
            return model;
        }

        public void Update(SharingStoryUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.SharingStory_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@StoryId", model.StoryId);
                    paramCol.AddWithValue("@StoryTitle", model.StoryTitle);
                    paramCol.AddWithValue("@Story", model.Story);
                    paramCol.AddWithValue("@ModifiedBy", model.ModifiedBy);
                });
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.SharingStory_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@StoryId", id);
                });
        }

        private SharingStoryDomain Mapper(IDataReader reader)
        {
            SharingStoryDomain model = new SharingStoryDomain();
            int index = 0;
            model.StoryId = reader.GetSafeInt32(index++);
            model.StoryTitle = reader.GetSafeString(index++);
            model.Story = reader.GetSafeString(index++);
            model.CreatedDate = reader.GetSafeDateTime(index++);
            model.ModifiedDate = reader.GetSafeDateTime(index++);
            model.ModifiedBy = reader.GetSafeString(index++);
            return model;
        }
    }
}