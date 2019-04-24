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
    public class SharingRecipeService : ISharingRecipeService
    {
        private IDataProvider _dataProvider;

        public SharingRecipeService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(SharingRecipeAddRequest model)
        {
            int RecipeId = 0;

            _dataProvider.ExecuteNonQuery(
                "dbo.SharingRecipes_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    SqlParameter parm = new SqlParameter();
                    parm.ParameterName = "@RecipeId";
                    parm.SqlDbType = System.Data.SqlDbType.Int;
                    parm.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(parm);

                    paramCol.AddWithValue("@RecipeTitle", model.RecipeTitle);
                    paramCol.AddWithValue("@Ingredients", model.Ingredients);
                    paramCol.AddWithValue("@Recipe", model.Recipe);
                    paramCol.AddWithValue("@ModifiedBy", model.ModifiedBy);
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    Int32.TryParse(paramCol["@RecipeId"].Value.ToString(), out RecipeId);
                });
            return RecipeId;
        }

        public List<SharingRecipeDomain> SelectAll()
        {
            List<SharingRecipeDomain> result = new List<SharingRecipeDomain>();
            _dataProvider.ExecuteCmd(
                "dbo.SharingRecipes_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SharingRecipeDomain model = Mapper(reader);
                    result.Add(model);
                });
            return result;
        }

        public SharingRecipeDomain SelectById(int id)
        {
            SharingRecipeDomain model = null;
            _dataProvider.ExecuteCmd(
                "dbo.SharingRecipes_SelectById",
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

        public void Update(SharingRecipeUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.SharingRecipes_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@RecipeId", model.RecipeId);
                    paramCol.AddWithValue("@RecipeTitle", model.RecipeTitle);
                    paramCol.AddWithValue("@Ingredients", model.Ingredients);
                    paramCol.AddWithValue("@Recipe", model.Recipe);
                    paramCol.AddWithValue("@ModifiedBy", model.ModifiedBy);
                });
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.SharingRecipes_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@RecipeId", id);
                });
        }

        private SharingRecipeDomain Mapper(IDataReader reader)
        {
            SharingRecipeDomain model = new SharingRecipeDomain();
            int index = 0;
            model.RecipeId = reader.GetSafeInt32(index++);
            model.RecipeTitle = reader.GetSafeString(index++);
            model.Ingredients = reader.GetSafeString(index++);
            model.Recipe = reader.GetSafeString(index++);
            model.CreatedDate = reader.GetSafeDateTime(index++);
            model.ModifiedDate = reader.GetSafeDateTime(index++);
            model.ModifiedBy = reader.GetSafeString(index++);
            return model;
        }
    }
}