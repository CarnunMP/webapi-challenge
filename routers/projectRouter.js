const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const middleware = require('../middleware');

const router = express.Router();
router.use('/:id', middleware.validateProjectId);

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
});

router.get('/:id', (req, res) => {
  res.status(200).json(req.project);
});

module.exports = router;