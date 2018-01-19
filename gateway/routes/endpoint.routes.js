var endpoint = require('../controllers/endpoint.controller.js');
var helpers = require('../app_util/helpers');


module.exports = function(app, router) {

    // Create a new Endpoint
    router.post('/endpoint', helpers.verifyAuthToken, endpoint.create);

    app.use(router);
}
