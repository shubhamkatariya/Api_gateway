var mongoose = require('mongoose');

var ApiSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});



module.exports = mongoose.model('Api', ApiSchema);
