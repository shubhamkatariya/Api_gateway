var express = require('express');
var app = express();

app.get('/test', function (req, res) {
   console.log('api called successfully');
   res.send("helloworld");
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
