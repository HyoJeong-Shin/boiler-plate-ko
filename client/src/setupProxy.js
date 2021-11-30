// 두개의 다른 포트(client는 3000, server는 5000)를 가지고 있는 서버 proxy 설정으로 request 보내기 가능
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',      // node 서버 port : 5000
      changeOrigin: true,
    })
  );
};