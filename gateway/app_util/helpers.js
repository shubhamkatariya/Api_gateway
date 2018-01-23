var response = require('../services/api_response.service')
var appException = require('../app_util/exceptions')
var config = require('../config/app_config');
var jwt = require("jsonwebtoken");


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
  var token = req.headers['token'];
  if(token){
    jwt.verify(token, 'shhhhh', function(err,ress){
      if(err){
        return response.errorResponse(req, res, appException.VALIDATION_EXCEPTION("Token invalid"), null)
      }else{
        next();
      }
    });
  } else{
    return response.errorResponse(req, res, appException.VALIDATION_EXCEPTION("Please send a token"), null)
  }
}
