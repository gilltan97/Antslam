// Credit to Michael Lin https://michaellin.me/deploy-multiple-apps-in-monorepo-to-heroku/
const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy api request
app.use(
  '/api',
  proxy({
    target: process.env.API_ROOT_URL || 'http://localhost:5000/api/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api': '',
    },
  }),
);

app.use(express.static(path.join(__dirname, 'build')));

// https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
