var userController = require('../controllers/user.controller.js');

module.exports = function(app, router) {
  // Create a user
  router.post('/user', userController.createUser);

  app.use(router);
}
