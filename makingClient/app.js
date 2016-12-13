var request = new Request();

///////////////////////////
$( document ).ready(function() {
	//Check if cookies show logged in
	if(getCookie("username")!="" && getCookie("sessId")!="") {
		//call Authentication method
		$("#auth").trigger('click');
		console.log("Logged in as " + getCookie("username"));
		//Show that the user is logged in
		$("#confirmation").html("Logged in as " + getCookie("username"));
	}
});
//Authentication button
$("#auth").click(function() {
	var username = getCookie("username");
	var sessId = getCookie("sessId");
	//if either one is empty then Authentication will fail no matter what
	if(username == "" || sessId == "") {
		console.log("Authentication Denied");
		return;
	}

	request.send({
		method: 'GET',
		url: 'http://localhost:3000/api/users/'
		+ username + "/" + sessId,
	}, function(err, user) {
		if (err) {
			console.log(err);
		}
		else if(user.errormsg != undefined) {
			console.log(user.errormsg);
		}
		else if(user) {
			console.log("Authentication Successful");
			return;
		}
		else {
			//Because Authentication was unsuccessful logout of account
			console.log("Authentication Denied");
		}
		killCookies();
	});
});
//Display cookies
$("#cookie").click(function() {
	alert(document.cookie);
	console.log(document.cookie);
});
//Sign Up
$("#up").click(function() {
	//prevent PHP from being called
	event.preventDefault();

	//If either textbox is empty then don't attemp to signup
	if($("#Pass").val() == "" || $("#User").val() == "") {
		console.log("Please enter username and password");
		return;
	}

	var parameters = {
		username: $("#User").val(),
		password: $("#Pass").val()
	};

	request.send({
		method: "POST",
		url: "http://localhost:3000/api/users",
		data: parameters
	},function(error,user) {
		if (error) {
			console.log(error);
		}
		else if(user == undefined) {
			console.log("something went wrong");
		}
		else if(user.errmsg!=undefined) {
			console.log(user);
		}
		else {
			//Call SignIn after Signing up had no errors
			$("#in").trigger('click');
			return;
		}
		killCookies();
	});
});

/////////////////////////
//Sign in
$("#in").click(function() {
	//If either textbox is empty then don't attemp to log in
	if($("#Pass").val() == "" || $("#User").val() == "") {
		console.log("Please enter username and password");
		return;
	}

	var parameters = {
		username: $("#User").val(),
		password: $("#Pass").val()
	};

	request.send({
		method: 'POST',
		url: 'http://localhost:3000/api/users/'
		+ $("#User").val(),
		data: parameters
	}, function(err, user) {
		if (err) {
			console.log(err);
		}
		else if(user == undefined) {
			console.log("something went wrong");
		}
		else if(user.errmsg!=undefined) {
			console.log(user);
		}
		//Create cookies for user session
		else {
			setCookie("username", user.username, 0);
			setCookie("sessId", user.sessId, 0)
			console.log(document.cookie);
			$("#confirmation").html("Logged in as " + getCookie("username"));
			return;
		}
		killCookies();
	});
});


function setCookie(cname, cvalue, exminutes) {
    var d = new Date();
    d.setTime(d.getTime() + (exminutes*60*1000));
    var expires = "expires="+ d.toUTCString();
    if(exminutes==0) {
    	document.cookie = cname + "=" + cvalue + ";";
    }
    else {
    	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
}

function getCookie(cname) {
    var name = cname + "=";
    //Turn cookies into an array
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function deleteCookie(cname) {
    setCookie(cname,"",-1);
}

function killCookies() {
	deleteCookie("username");
	deleteCookie("sessId");
	$("#confirmation").html(" Please Sign in or Sign up ");
}