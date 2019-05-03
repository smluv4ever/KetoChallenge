import axios from "axios";
import * as helpers from "./serviceHelpers";

const apiPrefix = "https://localhost:50001";

const PostFile = payload => {
  const config = {
    method: "POST",
    url: apiPrefix + "/api/fileupload/aws",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const GetFileById = id => {
  const config = {
    method: "GET",
    url: apiPrefix + `/api/fileupload/aws/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
    .catch(helpers.onGlobalError); // this is like the jQuery error: onError
};

const GetFileAll = () => {
  const config = {
    method: "GET",
    url: apiPrefix + "/api/fileupload",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { PostFile, GetFileById, GetFileAll };
