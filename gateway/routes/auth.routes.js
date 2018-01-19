var auth = require('../controllers/auth.controller.js');
var helpers = require('../app_util/helpers');


module.exports = function(app, router) {

    // Request Token
    router.get('/token', auth.getToken);

    // Set Token
    router.get('/oAuth', auth.setToken);

    app.use(router);
}
