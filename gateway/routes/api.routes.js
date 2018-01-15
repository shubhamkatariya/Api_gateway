var api = require('../controllers/api.controller.js');



module.exports = function(app) {
    // Create a new API
    app.post('/api', api.create);

    // Retrieve all api
    app.get('/api', api.findAll);

    // Retrieve a single API with apiId
    app.get('/api/:apiId', api.findOne);

    // Update a API with apiId
    app.put('/api/:apiId', api.update);

    // Delete a API with apiId
    app.delete('/api/:apiId', api.delete);
}
