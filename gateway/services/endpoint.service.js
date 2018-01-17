
var EndPoint = require('../models/endpoint.model.js');
var ApiService = require('../services/api.service.js');
var helper = require('../app_util/helpers')

var EndPointService = {
    create: function(params, callback) {
        ApiService.findByQuery({ id: params.apiID }, function (err){
            console.log("finding out");
            if(err) {
                var response = {status:500, message: "Some error occurred while creating the API."};
                return callback(response);
            }
        }, function(data) {
            if (data.data.length == 0) {
                var response = {status:400, message: "API with given ID doesn't exist."};
                return callback(response);
            } else {
                var path = params.path;
                var targetURL = params.targetURL;
                path = (path[0] === "/") ? path.replace("/", "") : path;
                var ep = new EndPoint({
                    path: path,
                    method: params.method,
                    apiID: params.apiID,
                    endpointURL: data.data[0].apiURL + path
                });

                ep.save(function(err, data) {
                    if(err) {
                        var response = {status:500, message: "Some error occurred while creating the API."};
                        return callback(response);
                        console.log(err);
                    } else {
                        var response = {status:200, message: "Endpoint created successfully.", data: data};
                        return callback(response);
                    }
                });
            }
        });
    },

    findByQuery: function(params, error, success) {
        // Find a single api with a apiId
        EndPoint.find(params, function(err, data) {
            console.log(params);
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
};

module.exports = EndPointService;
