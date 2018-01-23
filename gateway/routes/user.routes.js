var userController = require('../controllers/user.controller.js');
var util = require('util');
var helpers = require('../app_util/helpers');
var response = require('../services/api_response.service');
var sess;


module.exports = function(app, router) {
  // Create a user
  router.post('/user', userController.createUser);

  // login a user
  router.post('/login', userController.authUser);

  // router.get('/test', helpers.validateUserSession, function(res, res){
  //   return res.status(200).send('welcome');
  // })

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
      // res.json({
      //   result: "ok",
      //   message: 'Validate input successfully. Input params ='+  util.inspect(req.query)
      // });
    });
      //res.send("success")
    })

  router.get('/dashboard', helpers.verifyAuthToken, function(req, res){
    // if(!req.session.token){
    //   return res.status(401).send("Request does not contain session");
    // }
    data = {'msg':'welcome to dashboard'}
    return response.successResponse(req, res, data, null)
  });

  app.use(router);
}
