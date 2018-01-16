
var API = require('../models/api.model.js');

var ApiService = {
    create: function(params, callback) {
        API.findOne({ endpoint: params.endpoint, hostname: params.hostname}, function (err, data){
            if(err) {
                var response = {status:500, message: "Some error occurred while creating the API."};
                return callback(response);
            } else {
                console.log(data);
                if (!data) {
                    var api = new API({
                        title: params.title,
                        hostname: params.hostname,
                        endpoint: params.endpoint,
                        method: params.method,
                        params: params.params
                    });

                    api.save(function(err, data) {
                        if(err) {
                            var response = {status:500, message: "Some error occurred while creating the API."};
                            return callback(response);
                            console.log(err);
                        } else {
                            var response = {status:200, message: "API created successfully.", data: data};
                            return callback(response);
                        }
                    });
                } else {
                    var response = {status:400, message: "API with same hostname and endpoint already exists."};
                    return callback(response);
                }
            }
        });
    },

    findAll: function(params) {
        // Retrieve and return all apis from the database.
        API.find(function(err, apis){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving apis."});
            } else {
                res.send(apis);
            }
        });

    },

    findOne: function(params) {
        // Find a single api with a apiId
        API.findById(req.params.apiId, function(err, data) {
            if(err) {
                res.status(500).send({message: "Could not retrieve api with id " + req.params.apiId});
            } else {
                res.send(data);
            }
        });
    },

    findByQuery: function(params, error, success) {
        // Find a single api with a apiId
        API.find(params, function(err, data) {
            if(err) {
                var response = {status:404, message: "No API found."};
                return error(response);
                console.log(err);
            } else {
                var response = {status:200, message: "API found.", data: data};
                return success(response);
            }
        });
    },

    update: function(params) {
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

    },

    delete: function(params) {
        // Delete a api with the specified apiId in the request
         API.remove({_id: req.params.apiId}, function(err, data) {
            if(err) {
                res.status(500).send({message: "Could not delete api with id " + req.params.id});
            } else {
                res.send({message: "API deleted successfully!"})
            }
        });

    }
};

module.exports = ApiService;
