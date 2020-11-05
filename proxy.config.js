const proxy = [
  {
    context: '/api',
    target: 'http://localhost:7780',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
