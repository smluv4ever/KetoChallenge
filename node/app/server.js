const express = require("express");
const { json, urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const helmet = require("helmet");
const routes = require("./routes");
const Responses = require("sabio-web-models").Responses;

const app = express();
var createError = require("http-errors");
var cors = require("cors");
const http = require("http").Server(app);
// eslint-disable-next-line no-unused-vars
const io = (module.exports.io = require("socket.io")(http));

config();

const port = process.env.PORT || 8080; // DO NOT REMOVE THIS LINE!!!
app.use(cors({ credentials: true, origin: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// for use within IIS
// app.use("/node-api/server.js/", routes);
let apiPrefix = "";

if (typeof process.env.PORT !== "string") {
  apiPrefix = "node";
}

app.use("/" + apiPrefix, routes);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  let errResponse = new Responses.ErrorResponse([
    err.name,
    err.message,
    err.stack
  ]);
  res.status(err.status || 500);
  res.json(errResponse);
});

if (typeof apiPrefix === "string") {
  apiPrefix = apiPrefix + "/";
}

app._server = http.listen(port, () => {
  const url = `listening on http://localhost:${port}/${apiPrefix}api/ping  {click here to ping}`;
  console.log(url);
});

module.exports = app;
