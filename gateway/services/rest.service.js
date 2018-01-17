var querystring = require('querystring');
var https = require('https');

var RestService = {
  performRequest: function (hostname, endpoint, method, data, success) {
    var dataString = JSON.stringify(data);
    console.log(dataString);
    var headers = {};
    
    if (method == 'GET' && data !== null) {
      endpoint += '?' + querystring.stringify(data);
    }
    else {
      headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
      };
    }
    endpoint = (endpoint[0] == "/") ? endpoint : "/" + endpoint;
    var options = {
      host: hostname,
      path: endpoint,
      method: method,
      headers: headers
    };

    console.log(options);

    var req = https.request(options, function(res) {
      res.setEncoding('utf-8');

      var responseString = '';

      res.on('data', function(data) {
        responseString += data;
      });

      res.on('end', function() {
        console.log(responseString);
        var responseObject = JSON.parse(responseString);
        success(responseObject);
      });
    });

    req.write(dataString);
    req.end();
  }
}

module.exports = RestService;