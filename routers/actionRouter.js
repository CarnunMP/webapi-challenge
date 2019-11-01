const express = require('express');
const actionDb = require('../data/helpers/actionModel');
const middleware = require('../middleware');

const router = express.Router();
// router.use('/:id', middleware.validateActionId);

// CRUD here

module.exports = router;