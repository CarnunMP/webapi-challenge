const express = require('express');
const middleware = require('./middleware');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();

server.use(express.json());
server.use(middleware.logger);
server.use('/projects', projectRouter);
server.use('/projects/:id/actions', actionRouter);

server.get('/', (req, res) => {
  res.send("<h2>Let's gooooo...!<h2>");
});

module.exports = server;