var userController = require('../controllers/user.controller.js');

module.exports = function(app, router) {
  // Create a user
  router.post('/user', userController.createUser);

  // login a user
  router.post('/login', userController.authUser)

  app.use(router);
}
