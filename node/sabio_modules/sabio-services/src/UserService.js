const authenticationService = require("./AuthenticationService");
const { logger } = require("./common");

const _debug = logger.extend("user");

class UserService {
  logIn(res, userRequest) {
    _debug("login called");

    authenticationService.authenticate(res, userRequest);
  }

  logOut(res, userRequest) {
    authenticationService.logOut(res);
  }

  getCurrentUser(req) {
    return authenticationService.getCurrentUser(req);
  }
}

const userService = new UserService();

module.exports = userService;
