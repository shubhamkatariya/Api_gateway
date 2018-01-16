var API = require('../models/api.model.js');

var ApiService = {
    create: function(params) {
        // Create and Save a new API
        // if(!params) {
        //     res.status(400).send({message: "API can not be empty"});
        // } else {
            var api = new API({
                title: params.title,
                hostname: params.title,
                endpoint: params.endpoint,
                method: params.method,
                params: params.params
            });

            api.save(function(err, data) {
                // console.log(data);
                if(err) {
                    var response = {status:500, message: "Some error occurred while creating the API."};
                    return response;
                    console.log(err);
                    // res.status(500).send({message: "Some error occurred while creating the API."});
                } else {
                    var response = {status:200, message: "API created successfully.", data: data};
                    return response;
                }
            });
        // }
        
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
