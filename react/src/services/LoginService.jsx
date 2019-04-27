import axios from "axios";
import * as helpers from "./serviceHelpers";

class LoginService {
  static CheckLogin = payload => {
    const config = {
      method: "POST",
      url: helpers.API_HOST_PREFIX + "/api/login",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess)
      .catch(helpers.onGlobalError);
  };

  static LoginGetAll = () => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + "/api/login",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static LoginGetById = id => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + `/api/login/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static LoginUpdate = (id, payload) => {
    const config = {
      method: "PUT",
      url: helpers.API_HOST_PREFIX + `/api/login/${id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static LoginDelete = id => {
    const config = {
      method: "DELETE",
      url: helpers.API_HOST_PREFIX + `/api/login/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };
}
export default LoginService;
