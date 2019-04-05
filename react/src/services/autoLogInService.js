import axios from "axios";
import "./serviceHelpers";

let {
  REACT_APP_API_HOST_PREFIX: API,
  REACT_APP_API_NODE_HOST_PREFIX: NODE_API,
  REACT_APP_TEMP_USER_ID: userId,
  REACT_APP_TEMP_USER_NAME: userName,
  REACT_APP_TEMP_USER_ROLE: userRole,
  REACT_APP_VERBOSE: isVerbose
} = process.env;

class SiteTester {
  constructor(host) {
    this.host = host;
  }

  run = onDone => {
    console.group(" Auto Login Tests for " + this.host);

    this.logIn()
      .then(this.getCurrent)
      .then(() => this.getCurrent("POST"))
      .then(() => {
        console.groupEnd();
        if (onDone) {
          onDone();
        }
      });
  };

  logIn = httpMethod => {
    const config = {
      method: httpMethod || "GET",
      url: this.host + `/api/temp/auth/login/${userId}/${userName}/${userRole}`,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config)
      .then(this.onLogInSuccess)
      .catch(this.onErrorResponse);
  };

  getCurrent = httpMethod => {
    //
    const config = {
      method: httpMethod || "GET",
      url: this.host + "/api/temp/auth/current",
      headers: { "Content-Type": "application/json" }
    };

    return axios(config)
      .then(this.onLogInSuccess)
      .catch(this.onErrorResponse);
  };

  onLogInSuccess = response => {
    if (isVerbose) {
      console.log("OK", response);
    }
  };

  onErrorResponse = response => {
    console.error("OK", response);
  };
}

new SiteTester(NODE_API).run(() => {
  new SiteTester(API).run();
});
// export { logIn };
