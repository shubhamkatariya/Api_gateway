var API = require('../models/api.model.js');

exports.create = function(req, res) {
    // Create and Save a new API
    if(!req.body.title || !req.body.endpoint || !req.body.hostname) {
        res.status(400).send({message: "API can not be empty"});
    } else {
    	var result = ApiService.create(req.body, function(response) {
            console.log(response);
            res.status(response.status).send({message: response.message, data: response.data});
        })
    }

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
    // console.log(req.params);
    var requestURL = req.params[0];
    var hostname = requestURL.split('/')[0];
    var queries = {hostname: hostname, endpoint: requestURL.replace(hostname+'/', '')};
    console.log(queries);
    var result = ApiService.findByQuery(queries, function(err, data) {
        if (err) {
            console.log(err);
            res.status(err.status).send({message: err.message, data: err.data});
        } else {
            var requestData = data.data;
            RestService.performRequest(requestData.hostname, requestData.endpoint, requestData.method, {}, function(err, success){
                if (err) {
                    res.status(500).send({message: err});
                } else {
                    res.send({message: success});
                }
            });
        }

    });
    // console.log(url);
    // console.log(req);
    // req.url.slice(1, 5);
    // function (req, res) {
    //   res.send(req.url)
    // }
    // Delete a api with the specified apiId in the request
    // console.log(RestService.host);
    // RestService.performRequest(url, 'GET', {}, function(err, success){
    // 	if (err) {
    // 		res.status(500).send({message: err});
    // 	} else {
    //         res.send({message: success});
    //     }
    // });

};
