var ApiService = require('../services/api.service.js');
var RestService = require('../services/rest.service.js');

exports.create = function(req, res) {
    // Create and Save a new API
    console.log(req);
    if(!req.body.title || !req.body.endpoint || !req.body.hostname) {
        res.status(400).send({message: "API can not be empty"});
    } else {
    	var result = ApiService.create(req.body);
    	console.log(result);
    	res.status(result.status).send({message: result.message, data: result.data});
    }
    

    // api.save(function(err, data) {
    //     console.log(data);
    //     if(err) {
    //         console.log(err);
    //         res.status(500).send({message: "Some error occurred while creating the API."});
    //     } else {
    //         res.send(data);
    //     }
    // });

};

exports.findAll = function(req, res) {
    // Retrieve and return all apis from the database.
    API.find(function(err, apis){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving apis."});
        } else {
            res.send(apis);
        }
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
    // Delete a api with the specified apiId in the request
    console.log(RestService.host);
    RestService.performRequest('/posts/1', 'GET', {}, function(err, success){
    	if (err) {
    		res.status(500).send({message: err});
    	} else {
            res.send({message: success});
        }
    });

};