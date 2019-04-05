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
    [Route("api/advertisers")]
    public class AdvertisersController : BaseApiController
    {
        private IAdvertisersService _advertisersService;
        private IAuthenticationService<int> _authService;

        public AdvertisersController(IAdvertisersService advertisersService
            , IAuthenticationService<int> authService
            , ILogger<AdvertisersController> logger) : base(logger)
        {
            _advertisersService = advertisersService;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<AdvertisersDomain>> SelectAll()
        {
            try
            {
                List<AdvertisersDomain> advertisersList = new List<AdvertisersDomain>();

                advertisersList = _advertisersService.SelectAll();
                ItemsResponse<AdvertisersDomain> response = new ItemsResponse<AdvertisersDomain>();
                response.Items = advertisersList;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<AdvertisersDomain>> SelectById(int id)
        {
            try
            {
                AdvertisersDomain advertisersById = new AdvertisersDomain();
                advertisersById = _advertisersService.SelectById(id);
                ItemResponse<AdvertisersDomain> response = new ItemResponse<AdvertisersDomain>();
                response.Item = advertisersById;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Post(AdvertisersAddRequest model)
        {
            try
            {
                model.modifiedBy = "User" + _authService.GetCurrentUserId();
                int id = _advertisersService.Insert(model);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;
                return Created201(response);
                ;
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Put(AdvertisersUpdateRequest model)
        {
            try
            {
                model.modifiedBy = "User" + _authService.GetCurrentUserId();
                _advertisersService.Update(model);
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
                _advertisersService.Delete(id);
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