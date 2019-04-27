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
    [Route("api/register")]
    [ApiController]
    public class RegisterController : BaseApiController
    {
        private IRegisterService _RegisterService;
        private IAuthenticationService<int> _authService;

        public RegisterController(IRegisterService RegisterService
            , IAuthenticationService<int> authService
            , ILogger<RegisterController> logger) : base(logger)
        {
            _RegisterService = RegisterService;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<RegisterDomain>> SelectAll()
        {
            try
            {
                List<RegisterDomain> registerList = new List<RegisterDomain>();

                registerList = _RegisterService.SelectAll();
                ItemsResponse<RegisterDomain> response = new ItemsResponse<RegisterDomain>();
                response.Items = registerList;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<RegisterDomain>> SelectById(int id)
        {
            try
            {
                RegisterDomain registerById = new RegisterDomain();
                registerById = _RegisterService.SelectById(id);
                ItemResponse<RegisterDomain> response = new ItemResponse<RegisterDomain>();
                response.Item = registerById;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Post(RegisterAddRequest model)
        {
            try
            {
                //model.ModifiedBy = "User" + _authService.GetCurrentUserId();
                int RegisterId = _RegisterService.Insert(model);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = RegisterId;
                return Created201(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Put(RegisterUpdateRequest model)
        {
            try
            {
                //model.ModifiedBy = "User" + _authService.GetCurrentUserId();
                _RegisterService.Update(model);
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
                _RegisterService.Delete(id);
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