const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const middleware = require('../middleware');

const router = express.Router();
// router.use('/:id', middleware.validateProjectId);

// CRUD here

module.exports = router;