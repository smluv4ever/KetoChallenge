using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : BaseApiController
    {
        private ILoginService _LoginService;
        private IAuthenticationService<int> _authService;

        public LoginController(ILoginService LoginService
            , IAuthenticationService<int> authService
            , ILogger<LoginController> logger) : base(logger)
        {
            _LoginService = LoginService;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<LoginDomain>> SelectAll()
        {
            try
            {
                List<LoginDomain> loginList = new List<LoginDomain>();

                loginList = _LoginService.SelectAll();
                ItemsResponse<LoginDomain> response = new ItemsResponse<LoginDomain>();
                response.Items = loginList;
                return Ok200(response);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                return NotFound404(new ErrorResponse(exception.Message));
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<SuccessResponse> Login(LoginAddRequest model)
        {
            ActionResult result = null;
            try
            {
                LoginDomain userContent = _LoginService.checkLogin(model.UserName, model.Password);
                {
                    if (userContent.LoginId > 0)
                    {
                        bool isSuccess = _LoginService.Login(userContent);
                        if (isSuccess)
                        {
                            result = Ok200(new SuccessResponse());
                        }
                        else
                        {
                            result = StatusCode(500, new ErrorResponse("Login Failed"));
                        }
                    }
                    else
                    {
                        result = StatusCode(401, new ErrorResponse("Login Failed"));
                    }
                }
            }
            catch (Exception exception)
            {
                Logger.LogError(exception.ToString());
                result = StatusCode(500, new ErrorResponse(exception.Message));
            }
            return result;
        }

        //[HttpGet("{id:int}")]
        //public ActionResult<ItemResponse<LoginDomain>> SelectById(int id)
        //{
        //    try
        //    {
        //        LoginDomain loginById = new LoginDomain();
        //        loginById = _LoginService.SelectById(id);
        //        ItemResponse<LoginDomain> response = new ItemResponse<LoginDomain>();
        //        response.Item = loginById;
        //        return Ok200(response);
        //    }
        //    catch (Exception exception)
        //    {
        //        Logger.LogError(exception.ToString());
        //        return NotFound404(new ErrorResponse(exception.Message));
        //    }
        //}

        //[HttpPost]
        //public ActionResult<ItemResponse<int>> Post(LoginAddRequest model)
        //{
        //    try
        //    {
        //        //model.ModifiedBy = "User" + _authService.GetCurrentUserId();
        //        int LoginId = _LoginService.Insert(model);
        //        ItemResponse<int> response = new ItemResponse<int>();
        //        response.Item = LoginId;
        //        return Created201(response);
        //    }
        //    catch (Exception exception)
        //    {
        //        Logger.LogError(exception.ToString());
        //        return NotFound404(new ErrorResponse(exception.Message));
        //    }
        //}

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Put(LoginUpdateRequest model)
        {
            try
            {
                //model.ModifiedBy = "User" + _authService.GetCurrentUserId();
                _LoginService.Update(model);
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
                _LoginService.Delete(id);
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