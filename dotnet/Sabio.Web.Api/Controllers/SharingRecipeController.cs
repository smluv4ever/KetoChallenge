using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/sharing_recipe")]
    [ApiController]
    public class SharingRecipeController : BaseApiController
    {
        private ISharingRecipeService _SharingRecipeService;
        private IAuthenticationService<int> _authService;

        public SharingRecipeController(ISharingRecipeService SharingRecipeService
            , IAuthenticationService<int> authService
            , ILogger<SharingRecipeController> logger) : base(logger)
        {
            _SharingRecipeService = SharingRecipeService;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<SharingRecipeDomain>> SelectAll()
        {
            try
            {
                List<SharingRecipeDomain> sharingRecipeList = new List<SharingRecipeDomain>();

                sharingRecipeList = _SharingRecipeService.SelectAll();
                ItemsResponse<SharingRecipeDomain> response = new ItemsResponse<SharingRecipeDomain>();
                response.Items = sharingRecipeList;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<SharingRecipeDomain>> SelectById(int id)
        {
            try
            {
                SharingRecipeDomain sharingRecipeById = new SharingRecipeDomain();
                sharingRecipeById = _SharingRecipeService.SelectById(id);
                ItemResponse<SharingRecipeDomain> response = new ItemResponse<SharingRecipeDomain>();
                response.Item = sharingRecipeById;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Post(SharingRecipeAddRequest model)
        {
            try
            {
                model.ModifiedBy = "User" + _authService.GetCurrentUserId();
                int RecipeId = _SharingRecipeService.Insert(model);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = RecipeId;
                return Created201(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Put(SharingRecipeUpdateRequest model)
        {
            try
            {
                model.ModifiedBy = "User" + _authService.GetCurrentUserId();
                _SharingRecipeService.Update(model);
                SuccessResponse response = new SuccessResponse();
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            try
            {
                _SharingRecipeService.Delete(id);
                SuccessResponse response = new SuccessResponse();
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }
    }
}