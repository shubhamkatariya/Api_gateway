var api = require('../controllers/api.controller.js');
var helpers = require('../app_util/helpers');


module.exports = function(app, router) {
    
    // Create a new API
    router.post('/api', helpers.verifyAuthToken, api.create);

    // Retrieve all api
    router.get('/api', helpers.verifyAuthToken, api.findAll);

    // Retrieve a single API with apiId
    router.get('/api/:apiId', helpers.verifyAuthToken, api.findOne);

    // Update a API with apiId
    router.put('/api/:apiId', helpers.verifyAuthToken, api.update);

    // Delete a API with apiId
    router.delete('/api/:apiId', helpers.verifyAuthToken, api.delete);

    //call and API
    router.get('/call/*', helpers.verifyAuthToken, api.call)

    app.use(router);
}
