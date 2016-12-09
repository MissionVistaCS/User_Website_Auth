

var mongoose = require("mongoose");

var User = mongoose.model("User",{
	username: {
		required: true,
		unique: true,
		type:String
	},
	password: {
		type:String,
		required:true
	},
	sessId: {
		type:Number
	}
});


module.exports = User;


