var response = require('../services/api_response.service')
var appException = require('../app_util/exceptions')
var config = require('../config/app_config');


module.exports.validate_params = function(required_param, body_param) {
  for (var i=0; i<required_param.length; i++){
    if (body_param.includes(required_param[i]) == false){
      return {'param_name':required_param[i], 'include':false};
    }
  }
  return true;
}

module.exports.convertToSlug = function(txt) {
    return txt
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

module.exports.verifyAuthToken = function(req, res, next) {
  console.log(req.session.token);
  if(!req.headers['token']){
    return response.errorResponse(req, res, appException.VALIDATION_EXCEPTION(499, "Request does not contain token"), null)
  }
  else if (!req.session || req.session.token != req.headers['token']){
    return response.errorResponse(req, res, appException.NOT_AUTHORIZED("Your session has been expired"), null)
  }
  else if(req.headers['token']!=config.authToken){
    return response.errorResponse(req, res, appException.VALIDATION_EXCEPTION(498, "Invalid token"), null)
  }
  else{
    next();
  }
}


// module.exports.validateUserSession = function(req, res, next) {
//   if(!req.session)
// }
