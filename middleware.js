const projectDb = require('./data/helpers/projectModel');
const actionDb = require('./data/helpers/actionModel');

// general middleware
exports.logger = function(req, res, next){
    console.log(req.method, req.url, new Date().toISOString());  
    next();
}

// project middleware
exports.validateProjectId = function(req, res, next) {
  const { id } = req.params;

  projectDb.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({
          message: 'invalid project id',
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'validateProjectId failed: ' + err.message,
      });
    });
}

exports.validateProject = function(req, res, next) {
  const { body } = req;

  if (req.method === 'POST' || req.method === 'PUT') {
    if (!body) {
      res.status(400).json({
        message: 'missing project data',
      });
    } else if (!body.name || body.name === "") {
      res.status(400).json({
        message: 'missing required name field; name cannot be an empty string',
      });
    } else if (!body.description || body.description === "") {
      res.status(400).json({
        message: 'missing required description field; description cannot be an empty string',
      });
    }
  }

  req.project = body;
  next();
}

// action middleware
exports.validateActionId = function(req, res, next) {
  const { id } = req.params; // action id
  const projectId = req.project.id;

  actionDb.get(id)
    .then(action => {
      if (action && action.project_id === projectId) {
        req.action = action;
        next();
      } else if (action && action.project_id !== projectId) {
        res.status(404).json({
          message: 'there is no action with the given id assoiated with the given project',
        });
      } else {
        res.status(400).json({
          message: 'invalid action id',
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'validateActionId failed: ' + err.message,
      });
    });
}

exports.validateAction = function(req, res, next) {
  const { body } = req;

  if (req.method === 'POST' || req.method === 'PUT') {
    if (!body) {
      res.status(400).json({
        message: 'missing action data',
      });
    } else if (!body.description || body.description === "") {
      res.status(400).json({
        message: 'missing required description field; description cannot be an empty string',
      });
    } else if (!body.notes) {
      res.status(400).json({
        message: 'missing required notes field',
      });
    }
  }

  req.action = body;
  next();
}