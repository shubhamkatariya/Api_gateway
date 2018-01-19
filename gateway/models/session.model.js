var mongoose = require('mongoose');


var SessionSchema = mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
  lastAccess: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Session', SessionSchema);
