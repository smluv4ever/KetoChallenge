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

export { PostFile };
