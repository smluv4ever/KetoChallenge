import axios from "axios";
import * as helpers from "./serviceHelpers";

const apiPrefix = "https://localhost:50001";

const CheckLogin = payload => {
  const config = {
    method: "POST",
    url: apiPrefix + "/api/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const LoginGetAll = () => {
  const config = {
    method: "GET",
    url: apiPrefix + "/api/login",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const LoginGetById = id => {
  const config = {
    method: "GET",
    url: apiPrefix + `/api/login/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const LoginUpdate = (id, payload) => {
  const config = {
    method: "PUT",
    url: apiPrefix + `/api/login/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const LoginDelete = id => {
  const config = {
    method: "DELETE",
    url: apiPrefix + `/api/login/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};
export { CheckLogin, LoginGetAll, LoginGetById, LoginUpdate, LoginDelete };
