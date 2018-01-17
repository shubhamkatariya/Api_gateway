var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var EndpointsSchema = mongoose.Schema({
    method: String,
    path: String,
    apiID: String,
    endpointURL: String
}, {
    timestamps: true
});


EndpointsSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('Endpoints', EndpointsSchema);
