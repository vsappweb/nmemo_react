const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  if (!app) {
    throw new Error('`app` is not defined.');
  }

  try {
    app.use(
       '/api',
      createProxyMiddleware({
        target: 'http://localhost:8801',
        changeOrigin: true,
      })
    );
  } catch (error) {
    throw new Error(`Error setting up proxy: ${error.message}`);
  }
};
