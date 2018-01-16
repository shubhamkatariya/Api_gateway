var userService = require('../services/user.service')
var response = require('../services/api_response.service')
var appException = require('../app_util/exceptions')

module.exports.createUser = function(req, res) {
    userService.createUserService(req.body,function(err, userData) {
        if (err) {
            return response.errorResponse(req, res, appException.BAD_REQUEST("User already exist"), null)
        } else {
             return response.successResponse(req, res, userData, null)
        }
    });

}
