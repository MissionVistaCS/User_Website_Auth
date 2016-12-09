
var mongoose = require("mongoose");

var User = require("../../models/User");

module.exports = function(router) {
console.log('in 1 create.js');
	router.post("/users",function (request,response) {
		console.log('in 2 create.js');
		request.body.password = request.body.password.hashCode();
		User.create(request.body,function(error,user) {
		console.log('in 3 create.js');
			if (error) {
				return response.send(error);
			}
			user.password = undefined;
			return response.send(user);
		});
	});
}






