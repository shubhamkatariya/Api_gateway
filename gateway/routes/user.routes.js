var userController = require('../controllers/user.controller.js');
var util = require('util');
var helpers = require('../app_util/helpers');
var response = require('../services/api_response.service');


module.exports = function(app, router) {
  // Create a user
  router.post('/user', userController.createUser);

  // login a user
  router.post('/login', userController.authUser);

  router.get('/user', function(req, res, next){
    req.checkQuery('page', '"page" must be Int, not empty').notEmpty().isInt();
    req.checkQuery('limit', '"limit" must be Int, not empty').notEmpty().isInt();
    req.getValidationResult().then((validationResult) =>{
      if(!validationResult.isEmpty()){
        return res.json({
          result: "failed",
          message: 'Validation errors:' + util.inspect(validationResult.array())
        });
      }
      res.send("success")
    });
    })

  router.get('/dashboard', helpers.verifyAuthToken, function(req, res){
    data = {'msg':'welcome to dashboard'}
    return response.successResponse(req, res, data, null)
  });

  app.use(router);
}
