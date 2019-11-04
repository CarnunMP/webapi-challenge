const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');
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

router.delete('/:id/', (req, res) => {
  const { id } = req.params;
  const { project } = req;
  let actionsCount = 0;

  projectDb.remove(id)
    .then(count => {
      projectDb.getProjectActions(id) 
      .then(actions => {
        if (actions) {
          actions.forEach(action => {
            actionDb.remove(action.id)
              .then(count => {
                actionsCount += count;
              })
              .catch(err => {
                res.status(500).json({
                  message: 'DELETE /projects/:id/actions/:id: ' + err.message,
                });
              });
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'DELETE /projects/:id/actions/:id: ' + err.message,
        });
      });
      // Ah. Seems the actions are deleted automatically... nice!

      res.status(200).json({
        message: 'successfully deleted project',
        project,
        deletedActions: actionsCount,
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'DELETE /projects/:id: ' + err.message,
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project } = req;
  const updatedProject = req.body;

  projectDb.update(id, updatedProject)
    .then(newProject => {
      res.status(200).json({
        message: 'successfully updated project',
        project,
        newProject,
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'PUT /projects/:id: ' + err.message,
      });
    });
});

module.exports = router;