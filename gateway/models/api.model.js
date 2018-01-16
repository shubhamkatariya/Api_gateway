var mongoose = require('mongoose');

var ApiSchema = mongoose.Schema({
    title: String,
    host: String,
    hostname: String,
    endpoint: String,
    method: String,
    params: Schema.Types.Mixed
}, {
    timestamps: true
});



module.exports = mongoose.model('Api', ApiSchema);
