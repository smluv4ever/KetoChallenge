import axios from "axios";
import * as helpers from "./serviceHelpers";

class AdvertisersService {
  static AdvertisersPost = payload => {
    const config = {
      method: "POST",
      url: helpers.API_HOST_PREFIX + "/api/advertisers",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess)
      .catch(helpers.onGlobalError);
  };

  static AdvertisersGetAll = () => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + "/api/advertisers",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static AdvertisersGetById = id => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + `/api/advertisers/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static AdvertisersUpdate = (id, payload) => {
    const config = {
      method: "PUT",
      url: helpers.API_HOST_PREFIX + `/api/advertisers/${id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static AdvertisersDelete = id => {
    const config = {
      method: "DELETE",
      url: helpers.API_HOST_PREFIX + `/api/advertisers/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };
}
export default AdvertisersService;
