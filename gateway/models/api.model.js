var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApiSchema = mongoose.Schema({
    title: String,
    host: String,
    endpoint: String,
    method: String,
    params: Schema.Types.Mixed
}, {
    timestamps: true
});

module.exports = mongoose.model('Api', ApiSchema);
