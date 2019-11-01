const express = require('express');
const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');
const middleware = require('../middleware');

const router = express.Router();
router.use('/:id', middleware.validateActionId);

router.get('/', (req, res) => {
  const { id } = req.project;

  projectDb.getProjectActions(id)
  .then(actions => {
    // TODO: What if the project exists, but there are no actions??
    res.status(200).json(actions);
  })
  .catch(err => {
    res.status(500).json({
      message: `GET /projects/${id}/actions: ` + err.message,
    });
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json(req.action);
})

router.post('/', middleware.validateAction, (req, res) => {
  const { id } = req.project; // Project id!

  const actionWithProjectId = {
    ...req.action,
    project_id: id,
  };

  actionDb.insert(actionWithProjectId)
    .then(action => {
      res.status(201).json({
        message: 'successfully added action',
        action,
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'POST /projects/:id/actions: ' + err.message,
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { action } = req;
  
  actionDb.remove(id)
    .then(count => {
      res.status(200).json({
        message: 'successfully deleted action',
        action,
        count,
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'DELETE /projects/:id/actions/:id: ' + err.message,
      });
    });
})

module.exports = router;