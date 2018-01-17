
var EndPoint = require('../models/endpoint.model.js');
var ApiService = require('../services/api.service.js');
var helper = require('../app_util/helpers')

var EndPointService = {
    create: function(params, callback) {
        ApiService.findOne({ title: params.title, username: params.username}, function (err, data){
            if(err) {
                var response = {status:500, message: "Some error occurred while creating the API."};
                return callback(response);
            } else {
                console.log(data);
                if (!data) {
                    var slug = helper.convertToSlug(params.title);
                    var targetURL = params.targetURL;
                    targetURL = (targetURL[targetURL.length-1] === "/") ? targetURL : targetURL + "/";
                    var api = new API({
                        title: params.title,
                        username: params.username,
                        targetURL: targetURL,
                        slug: slug,
                        apiURL: targetURL+slug+"/"
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
    }
};

module.exports = EndPointService;
