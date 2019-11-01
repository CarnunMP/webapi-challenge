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

router.post('/', middleware.validateProject, (req, res) => {
  projectDb.insert(req.project)
    .then(project => {
      res.status(201).json({
        message: 'successfully added project',
        project,
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'POST /projects: ' + err.message,
      });
    })
});

module.exports = router;