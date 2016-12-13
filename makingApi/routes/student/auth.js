var mongoose = require("mongoose");

var User = require("../../models/User");

module.exports = function(router) {
	console.log('in 1 auth.js');
	router.get("/users/:username/:sessId",function (request,response) {
		console.log('in 2 auth.js');
		User.findOne({username:request.params.username},function(error,user) {
			console.log('in 3 auth.js');
			if (error) {
				return response.send(error);
			}
			else if (user == undefined) {
				var err = {
					'errmsg' : "no user of that name" + request.params.username
				};
				return response.send(err);
			}
			else if (request.params.sessId == user.sessId) {
				console.log(request.params.sessId);
				console.log(user.sessId);
				return response.send(true);
			}
			else {
				return response.send(false);
			}
			return response.send(false);
		});
	});
}