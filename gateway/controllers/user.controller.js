var userService = require('../services/user.service')
var response = require('../services/api_response.service')
var appException = require('../app_util/exceptions')
var helpers = require('../app_util/helpers')

module.exports.createUser = function(req, res) {
    try {
      userService.getUserService(req.body,function(err, userData) {
        var required_param = ['username', 'email', 'password', 'site_name']
        var body_param = Object.keys(req.body);
        validate_params = helpers.validate_params(required_param, body_param);
        if (validate_params.include == false){
          return response.errorResponse(req, res, appException.BAD_REQUEST(validate_params.param_name+" is missing"), null)
        }

        if (err){
          return response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err)
        }
        else if (userData != null) {
          return response.errorResponse(req, res, appException.VERIFICATION_EXCEPTION(userData), null)
        }

      userService.createUserService(req.body, function(err, userData) {
        if (err) {
            return response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err)
        } else {
             return response.successResponse(req, res, userData, "User added successfully")
        }
      });
      });
    } catch (err){
      return response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err)
    }
}


module.exports.authUser = function(req, res) {
  try{
    userService.authUserService(req.body, function(err, userData){
      var required_param = ['email', 'password']
      var body_param = Object.keys(req.body);

      validate_params = helpers.validate_params(required_param, body_param);

      if (validate_params.include == false){
        return response.errorResponse(req, res, appException.BAD_REQUEST(validate_params.param_name+" is missing"), null)
      }

      if (err){
        return response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err)
      }
      else if (userData == null){
        return response.errorResponse(req, res, appException.NOT_AUTHORIZED("User does not exist"), null)
      }

      else{
        return response.successResponse(req, res, userData, "Login Successful")
      }
    });
  } catch (err){
    return response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err)
  }
}
