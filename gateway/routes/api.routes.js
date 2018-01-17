var api = require('../controllers/api.controller.js');
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


    // Create a new API
    router.post('/api', api.create);

    // Retrieve all api
    router.get('/api', api.findAll);

    // Retrieve a single API with apiId
    router.get('/api/:apiId', api.findOne);

    // Update a API with apiId
    router.put('/api/:apiId', api.update);

    // Delete a API with apiId
    router.delete('/api/:apiId', api.delete);

    //call and API
    router.get('/call/*', api.call)

    app.use(router);
}
