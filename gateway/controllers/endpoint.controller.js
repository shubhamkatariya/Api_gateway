var EndPointService = require('../services/endpoint.service.js');
var helpers = require('../app_util/helpers')

exports.create = function(req, res) {
    // Create and Save a new API
    var requiredParams = ['apiID', 'path', 'method']
    var bodyParams = Object.keys(req.body);
    validateParams = helpers.validate_params(requiredParams, bodyParams);
    if (validateParams.include == false){
        return  res.status(400).send({message: validateParams.param_name+" can not be empty"});
    } else {
    	var result = EndPointService.create(req.body, function(response) {
            console.log(response);
            res.status(response.status).send({message: response.message, data: response.data});
        })
    }

};
