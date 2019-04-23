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
    [Route("api/sharing_story")]
    [ApiController]
    public class SharingStoryController : BaseApiController
    {
        private ISharingStoryService _SharingStoryService;
        private IAuthenticationService<int> _authService;

        public SharingStoryController(ISharingStoryService SharingStoryService
            , IAuthenticationService<int> authService
            , ILogger<SharingStoryController> logger) : base(logger)
        {
            _SharingStoryService = SharingStoryService;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<SharingStoryDomain>> SelectAll()
        {
            try
            {
                List<SharingStoryDomain> sharingStoryList = new List<SharingStoryDomain>();

                sharingStoryList = _SharingStoryService.SelectAll();
                ItemsResponse<SharingStoryDomain> response = new ItemsResponse<SharingStoryDomain>();
                response.Items = sharingStoryList;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<SharingStoryDomain>> SelectById(int id)
        {
            try
            {
                SharingStoryDomain sharingStoryById = new SharingStoryDomain();
                sharingStoryById = _SharingStoryService.SelectById(id);
                ItemResponse<SharingStoryDomain> response = new ItemResponse<SharingStoryDomain>();
                response.Item = sharingStoryById;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Post(SharingStoryAddRequest model)
        {
            try
            {
                model.ModifiedBy = "User" + _authService.GetCurrentUserId();
                int RecipeId = _SharingStoryService.Insert(model);
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
        public ActionResult<SuccessResponse> Put(SharingStoryUpdateRequest model)
        {
            try
            {
                model.ModifiedBy = "User" + _authService.GetCurrentUserId();
                _SharingStoryService.Update(model);
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
                _SharingStoryService.Delete(id);
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