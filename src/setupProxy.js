const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  if (!app) {
    throw new Error('`app` is not defined.');
  }

  try {
    console.log('*****\nSetting up proxy\n*****');
    app.use(
       '/api',
      createProxyMiddleware({
        target: 'http://localhost:8800',
        changeOrigin: true,
        followRedirects: true, // allow redirects
      })
    );
  } catch (error) {
    throw new Error(`Error setting up proxy: ${error.message}`);
  }
};
