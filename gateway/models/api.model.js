var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var ApiSchema = mongoose.Schema({
    title: String,
    targetURL: String,
    userID: String,
    slug: String,
    apiURL: String
}, {
    timestamps: true
});

ApiSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Api', ApiSchema);
