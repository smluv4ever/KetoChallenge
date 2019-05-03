import axios from "axios";
import * as helpers from "./serviceHelpers";

const FindRecipeGetBySearch = search => {
  const config = {
    method: "GET",
    url: `https://api.edamam.com/search?q=${search}&app_id=c12c0f9f&app_key=068248130959d65e65eb8d543f41f91e&health=alcohol-free`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};
export { FindRecipeGetBySearch };
