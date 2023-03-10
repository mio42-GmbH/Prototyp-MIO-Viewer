/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/assets',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8080',
            changeOrigin: true,
        }),
    )
    app.use(
        '/data',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8080',
            changeOrigin: true,
        }),
    )
}
