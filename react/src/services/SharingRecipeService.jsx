import axios from "axios";
import * as helpers from "./serviceHelpers";

class SharingRecipeService {
  static sharingRecipePost = payload => {
    const config = {
      method: "POST",
      url: helpers.API_HOST_PREFIX + "/api/sharing_recipe",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess)
      .catch(helpers.onGlobalError);
  };

  static sharingRecipeGetAll = () => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + "/api/sharing_recipe",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static sharingRecipeGetById = id => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + `/api/sharing_recipe/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static sharingRecipeUpdate = (id, payload) => {
    const config = {
      method: "PUT",
      url: helpers.API_HOST_PREFIX + `/api/sharing_recipe/${id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static sharingRecipeDelete = id => {
    const config = {
      method: "DELETE",
      url: helpers.API_HOST_PREFIX + `/api/sharing_recipe/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };
}
export default SharingRecipeService;
