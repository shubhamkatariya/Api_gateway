'use strict';

const express = require('express');
var bodyParser = require('body-parser');
// App
const app = express();
var router=express.Router();
var expressValidator = require('express-validator')

const validatorOption = {}

app.use(expressValidator(validatorOption));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

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
require('./routes/api.routes.js')(app, router);
require('./routes/user.routes.js')(app, router);


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
