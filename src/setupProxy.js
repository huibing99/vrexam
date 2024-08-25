
const {createProxyMiddleware: proxy} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
      proxy('/api', {
        target: 'http://localhost:9090',
        changeOrigin: true,
        pathRewrite: {
            "^/api": "",
        },
      }),
      proxy('/elasticsearch', {
        target: 'http://localhost:9288',
        changeOrigin: true,
        pathRewrite: {
            "^/elasticsearch": "",
        },
      })
    );
}
