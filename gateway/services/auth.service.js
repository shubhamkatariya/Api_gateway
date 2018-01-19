var ClientOAuth2 = require('client-oauth2')
 
var googleAuth = new ClientOAuth2({
  clientId: '726748975766-n16gkkca1o2nlt775tilr89qve8n18op.apps.googleusercontent.com',
  clientSecret: 'eZtTA23f4GNSKeQ5UwYFnNrQ',
  accessTokenUri: 'https://accounts.google.com/o/oauth2/token',
  authorizationUri: 'https://accounts.google.com/o/oauth2/auth',
  redirectUri: 'http://localhost:8080/oAuth',
  scopes: ['profile']
})


var AuthService = {
	getByCredentials: function(username, password, callback) {
		// console.log(googleAuth.getOwnPropertyNames());
		googleAuth.owner.getToken(username, password).then(function (user) {
		    console.log(user);
		    callback(user);
		})
		// googleAuth.credentials.getToken()
		//   .then(function (user) {
		//     console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... } 
		//   })
	},
	redirect: function(res) {
		var uri = googleAuth.code.getUri()
		res.redirect(uri)
	},
	setToken: function(req, res, callback) {
	  	googleAuth.code.getToken(req.originalUrl)
	    .then(function (user) {
	      console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... } 
	 
	      // Refresh the current users access token. 
	      user.refresh().then(function (updatedUser) {
	        console.log(updatedUser !== user) //=> true 
	        console.log(updatedUser.accessToken)
	      })
	 
	      // Sign API requests on behalf of the current user. 
	      // user.sign({
	      //   method: 'get',
	      //   url: 'http://example.com'
	      // })
	 
	      // We should store the token into a database. 
	      return res.send(user.accessToken)
	    });
	}
}
module.exports = AuthService;