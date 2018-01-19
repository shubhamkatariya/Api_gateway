var authService = require('../services/auth.service.js');
var helpers = require('../app_util/helpers')

exports.getToken = function(req, res) {
    console.log("request arrived");
    // authService.redirect(res);
    authService.getByCredentials("shubhchoubey8", "mask89585", function(user) {
        console.log("successfully returned");
    });
};

exports.setToken = function(req, res) {
    authService.setToken(req, res);
};
