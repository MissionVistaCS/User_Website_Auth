
var mongoose = require("mongoose");

var User = require("../../models/User");

module.exports = function(router) {
	console.log('in 1 delete.js');

	router.delete("/students/:user",function (request,response) {
		console.log('in 2 delete.user');
		console.log(request.params.username);

		User.remove({username:request.params.username},function(error,removed) {
console.log('in 3 delete.js');
			if (error) {
				return response.send(error);
			}

			return response.send(removed.result);
		});
	});
}






