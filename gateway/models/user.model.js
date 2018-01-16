var mongoose = require('mongoose');


var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  site_name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
