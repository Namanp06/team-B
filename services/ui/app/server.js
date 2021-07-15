const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

// Proxy API request
app.use(
    '/mern-starter',
    proxy({
        target:
            process.env.REACT_APP_API_URL ||
            `${protocol}://mern-starter-api:4000`,
        changeOrigin: true,
        ws: true,
        onProxyRes: (proxyRes, req, res) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
    })
);
// Static assets root directory
const staticAssetsRoot = path.join(__dirname, 'build');
// Serve static assets
app.use(express.static(staticAssetsRoot));
// SPA fallback route
app.get('*', function (req, res) {
    res.sendFile('index.html', { root: staticAssetsRoot });
});
// Start server
app.listen(PORT, () => console.log(`ui server started on port ${PORT}`));
