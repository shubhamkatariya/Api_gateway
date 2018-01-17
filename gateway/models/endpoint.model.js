var mongoose = require('mongoose');
const endPointIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var EndpointsSchema = mongoose.Schema({
    method: String,
    path: String,
    apiID: String,
    endpointURL: String
}, {
    timestamps: true
});


EndpointsSchema.plugin(endPointIncrement, {inc_field: 'epID'});
module.exports = mongoose.model('Endpoints', EndpointsSchema);
