'use strict';

const express = require('express');
var bodyParser = require('body-parser');

// App
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());


// handle errors with codes
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.send({message: err.message,
//         error: err});
//     // res.render('error', {
//     //     message: err.message,
//     //     error: err
//     // });
//  });

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// Require Notes routes
require('./routes/api.routes.js')(app);
require('./routes/user.routes.js')(app);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
