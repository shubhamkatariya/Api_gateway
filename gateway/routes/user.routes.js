var userController = require('../controllers/user.controller.js');

module.exports = function(app) {
  // Create a user
  app.post('/user', userController.createUser);
}
