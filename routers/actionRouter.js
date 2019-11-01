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

module.exports = router;