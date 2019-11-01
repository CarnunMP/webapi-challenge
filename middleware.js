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
    })
}

// action middleware