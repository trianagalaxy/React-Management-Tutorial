const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy('/api/buffercache', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/diccache', { target: 'http://localhost:5000/' }));
};
