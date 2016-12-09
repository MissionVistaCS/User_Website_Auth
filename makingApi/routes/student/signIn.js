
var mongoose = require("mongoose");

var User = require("../../models/User");

module.exports = function(router) {
	console.log('in 1 signin.js');
	router.post("/users/:username",function (request,response) {
		console.log('in 2 signin.js');
		//First paramenter to get User, Second to do all the code inside the function
		User.findOne({username:request.params.username},function(error,user) {
			console.log('in 3 signin.js');
			//sends back error if error
			if (error) {
				console.log(error);
				return response.send(error);
			}
			//makes sure user isn't empty
			else if (user == undefined) {
				var err = {
					'errormsg' : "no user of that name " + request.params.username
				};
				return response.send(err);
			}
			//checks if unhashed password is the same as hashed password in database
			else if (request.body.password.SameAsHash(user.password)) {
				//gives the User a unique session ID
				request.body.sessId=Math.floor(Math.random()*10000000);
				//rehashes the request.body.password so you can add sessionId
				request.body.password = request.body.password.hashCode();
				//Adds the new unique session ID to user
				//First Parameter to find user, Second to change session Id, Third to return the changed User, and Fourth to do the function
				x = User.findOneAndUpdate({username:request.params.username}, {$set:{sessId:request.body.sessId}}, {new: true}, function(error,nUser) {
					//Makes it so that the webclient cannot see password;
					nUser.password=undefined;
					//Sends NewUser back
					return response.send(nUser);
				});
			}
			//If the password is wrong then return false
			else {
				return response.send(false);
			}
		});
	});
}
