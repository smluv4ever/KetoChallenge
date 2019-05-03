import axios from "axios";
import * as helpers from "./serviceHelpers";

const apiPrefix = "https://localhost:50001";

const sharingRecipePost = payload => {
  const config = {
    method: "POST",
    url: apiPrefix + "/api/sharing_recipe",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const sharingRecipeGetAll = () => {
  const config = {
    method: "GET",
    url: apiPrefix + "/api/sharing_recipe",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const sharingRecipeGetById = id => {
  const config = {
    method: "GET",
    url: apiPrefix + `/api/sharing_recipe/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const sharingRecipeUpdate = (id, payload) => {
  const config = {
    method: "PUT",
    url: apiPrefix + `/api/sharing_recipe/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const sharingRecipeDelete = id => {
  const config = {
    method: "DELETE",
    url: apiPrefix + `/api/sharing_recipe/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};
export {
  sharingRecipePost,
  sharingRecipeGetAll,
  sharingRecipeGetById,
  sharingRecipeUpdate,
  sharingRecipeDelete
};
