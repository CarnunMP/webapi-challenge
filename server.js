const express = require('express');
const middleware = require('./middleware');

const server = express();

server.use(express.json());
server.use(middleware.logger);

server.get('/', (req, res) => {
  res.send("<h2>Let's gooooo...!<h2>");
});

module.exports = server;