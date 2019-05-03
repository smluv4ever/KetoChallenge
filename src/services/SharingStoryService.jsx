import axios from "axios";
import * as helpers from "./serviceHelpers";

const apiPrefix = "https://localhost:50001";

const sharingStoryPost = payload => {
  const config = {
    method: "POST",
    url: apiPrefix + "/api/sharing_story",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const sharingStoryGetAll = () => {
  const config = {
    method: "GET",
    url: apiPrefix + "/api/sharing_story",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const sharingStoryGetById = id => {
  const config = {
    method: "GET",
    url: apiPrefix + `/api/sharing_story/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const sharingStoryUpdate = (id, payload) => {
  const config = {
    method: "PUT",
    url: apiPrefix + `/api/sharing_story/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const sharingStoryDelete = id => {
  const config = {
    method: "DELETE",
    url: apiPrefix + `/api/sharing_story/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

export {
  sharingStoryPost,
  sharingStoryGetAll,
  sharingStoryGetById,
  sharingStoryUpdate,
  sharingStoryDelete
};
