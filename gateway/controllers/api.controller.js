var ApiService = require('../services/api.service.js');
var EndpointService = require('../services/endpoint.service.js');
var RestService = require('../services/rest.service.js');
var helpers = require('../app_util/helpers')

exports.create = function(req, res) {
    // Create and Save a new API
    var requiredParams = ['title', 'targetURL', 'userID']
    var bodyParams = Object.keys(req.body);
    validateParams = helpers.validate_params(requiredParams, bodyParams);
    if (validateParams.include == false){
        return  res.status(400).send({message: validateParams.param_name+" can not be empty"});
    } else {
    	var result = ApiService.create(req.body, function(response) {
            console.log(response);
            res.status(response.status).send({message: response.message, data: response.data});
        })
    }

};

exports.findAll = function(req, res) {
    // Retrieve and return all apis from the database.
    ApiService.findAll(function(err){
        res.status(err.status).send({message: err.message});
    }, function(data){
        res.send(data);
    });

};

exports.findOne = function(req, res) {
    // Find a single api with a apiId
    API.findById(req.params.apiId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve api with id " + req.params.apiId});
        } else {
            res.send(data);
        }
    });

};

exports.update = function(req, res) {
    // Update a api identified by the apiId in the request
     API.findById(req.params.apiId, function(err, api) {
        if(err) {
            res.status(500).send({message: "Could not find a api with id " + req.params.apiId});
        }

        api.title = req.body.title;
        api.content = req.body.content;

        api.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update api with id " + req.params.apiId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) {
    // Delete a api with the specified apiId in the request
     API.remove({_id: req.params.apiId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete api with id " + req.params.id});
        } else {
            res.send({message: "API deleted successfully!"})
        }
    });

};

exports.call = function(req, res) {
    var requestURL = req.params[0];
    var userID = requestURL.split('/')[0];
    var slug = requestURL.split('/')[1];
    var queries = {userID: userID, slug: slug};
    console.log(queries);
    var result = ApiService.findByQuery(queries, function(err) {
        console.log(err);
        res.status(err.status).send({message: err.message, data: err.data});

    }, function(data){
        var apiData = data.data;
        if (apiData.length > 0) {
            EndpointService.findByQuery({endpointURL: {$regex : requestURL}}, function(err) {
                if (err) {
                    res.status(500).send({message: err});
                }
            }, function(data) {
                var callData = data.data;
                console.log(data);
                if (callData.length > 0) {
                    var targetURL = apiData[0].targetURL;
                    targetURL = targetURL.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, "");
                    // targetURL = targetURL.replace("http://", "");
                    // targetURL = targetURL.replace("/", "");
                    console.log(targetURL);
                    RestService.performRequest(targetURL, callData[0].path, callData[0].method, {}, function(err, success){
                        if (err) {
                            res.status(500).send({message: err});
                        } else {
                            res.send({message: success});
                        }
                    });
                } else {
                    res.status(400).send({message: "Bad request."});
                }
                
            });
        } else {
            res.status(500).send({message: "Endpoint does not exist."});
        }
        
        // RestService.performRequest(requestData.hostname, requestData.endpoint, requestData.method, {}, function(err, success){
        //     if (err) {
        //         res.status(500).send({message: err});
        //     } else {
        //         res.send({message: success});
        //     }
        // });
    });

};
