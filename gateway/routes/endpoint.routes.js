var endpoint = require('../controllers/endpoint.controller.js');
var config = require('../config/app_config');
var response = require('../services/api_response.service')
var appException = require('../app_util/exceptions')


module.exports = function(app, router) {

    // token validation middleware
    router.use(function(req,res,next){
        if(!req.headers['token']){
          return response.errorResponse(req, res, appException.VALIDATION_EXCEPTION(499, "Request does not contain token"), null)
        }
        else if(req.headers['token']!=config.authToken){
          return response.errorResponse(req, res, appException.VALIDATION_EXCEPTION(498, "Invalid token"), null)
        }
        else{
          next();
        }
    });
    // Create a new Endpoint
    router.post('/endpoint', endpoint.create);

    app.use(router);
}
