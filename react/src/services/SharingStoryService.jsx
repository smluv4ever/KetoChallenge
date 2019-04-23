import axios from "axios";
import * as helpers from "./serviceHelpers";

class SharingStoryService {
  static sharingStoryPost = payload => {
    const config = {
      method: "POST",
      url: helpers.API_HOST_PREFIX + "/api/sharing_story",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess)
      .catch(helpers.onGlobalError);
  };

  static sharingStoryGetAll = () => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + "/api/sharing_story",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static sharingStoryGetById = id => {
    const config = {
      method: "GET",
      url: helpers.API_HOST_PREFIX + `/api/sharing_story/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static sharingStoryUpdate = (id, payload) => {
    const config = {
      method: "PUT",
      url: helpers.API_HOST_PREFIX + `/api/sharing_story/${id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };

  static sharingStoryDelete = id => {
    const config = {
      method: "DELETE",
      url: helpers.API_HOST_PREFIX + `/api/sharing_story/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config)
      .then(helpers.onGlobalSuccess) // this is like the jQuery success : onSuccess
      .catch(helpers.onGlobalError); // this is like the jQuery error: onError
  };
}
export default SharingStoryService;
