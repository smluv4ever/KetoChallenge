const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "https://localhost:50001/" }));
  app.use(proxy("/node", { target: "http://localhost:8080/node" }));
};
