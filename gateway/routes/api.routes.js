var api = require('../controllers/api.controller.js');



module.exports = function(app, router) {
    // Create a new API
    router.post('/api', api.create);

    // Retrieve all api
    router.get('/api', api.findAll);

    // Retrieve a single API with apiId
    router.get('/api/:apiId', api.findOne);

    // Update a API with apiId
    router.put('/api/:apiId', api.update);

    // Delete a API with apiId
    router.delete('/api/:apiId', api.delete);

    //call and API
    router.get('/call/*', api.call)

    app.use(router);
}
