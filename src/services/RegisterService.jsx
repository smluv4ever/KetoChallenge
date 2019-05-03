import axios from "axios";
import * as helpers from "./serviceHelpers";

const apiPrefix = "https://localhost:50001";

const RegisterPost = payload => {
  const config = {
    method: "POST",
    url: apiPrefix + "/api/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const RegisterGetAll = () => {
  const config = {
    method: "GET",
    url: apiPrefix + "/api/register",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const RegisterGetById = id => {
  const config = {
    method: "GET",
    url: apiPrefix + `/api/register/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const RegisterUpdate = (id, payload) => {
  const config = {
    method: "PUT",
    url: apiPrefix + `/api/register/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const RegisterDelete = id => {
  const config = {
    method: "DELETE",
    url: apiPrefix + `/api/register/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};
export {
  RegisterPost,
  RegisterGetAll,
  RegisterGetById,
  RegisterUpdate,
  RegisterDelete
};
