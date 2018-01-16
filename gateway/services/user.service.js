var user = require('../models/user.model')

module.exports = {
  createUserService: function(reqData, callback) {
    var userObject = new user({
      username: reqData.username,
      email: reqData.email,
      password: reqData.password,
      site_name: reqData.site_name
    });

    userObject.save(function(err, res_data){
      if(err){
        return callback(err)
      }
      console.log("user data saved Successfully");
      return callback(null, res_data)
    });
  },


  getUserService: function(reqData, callback) {
    user.findOne({'email':reqData.email}, function(err, res_data){
      if(err){
        return callback(err)
      }
      else if (res_data != null && reqData.email == res_data.email){
        return callback(null, "user already exist")
      }
      else{
        return callback(null, null)
      }
    });
  },

}
