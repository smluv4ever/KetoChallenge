/*
This express middleware function attempts to decode a Token that is
generated by the Sabio .NET API server.

* If the token is decoded successfully, req.user will contain information about the user.
* If the token is bad/not present, req.user will be set to null.
*/
const { userService } = require("sabio-services");
const { logger } = require("./common");
const chalk = require("chalk");

let _debug = logger.extend("bindUser");

module.exports = function bindUser(req, res, next) {
  try {
    const authCookie = req.cookies.authentication;
    if (authCookie) {
      _debug(chalk.green("extracted user from cookie"));
      req.user = userService.getCurrentUser(req);
    }
  } catch (e) {
    _debug(
      chalk.red.underline("exception extracting user from cookie:" + e.message)
    );
    req.user = null;
  }
  next();
};
