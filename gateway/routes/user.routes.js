var userController = require('../controllers/user.controller.js');
var util = require('util')

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
      // res.json({
      //   result: "ok",
      //   message: 'Validate input successfully. Input params ='+  util.inspect(req.query)
      // });
    });
      //res.send("success")
    })

  app.use(router);
}
