import axios from "axios";
import * as helpers from "./serviceHelpers";

const apiPrefix = "https://localhost:50001";

const KetoNewsGetAll = () => {
  const config = {
    method: "GET",
    url: apiPrefix + "/api/keto_news",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { KetoNewsGetAll };
