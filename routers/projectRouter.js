const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const middleware = require('../middleware');

const router = express.Router();
// router.use('/:id', middleware.validateProjectId);

// CRUD here
router.get('/', (req, res) => {
  projectDb.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message: "GET /projects: " + err.message,
      });
    });
})

module.exports = router;