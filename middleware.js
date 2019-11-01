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
  const { id } = req.params;

  actionDb.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
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