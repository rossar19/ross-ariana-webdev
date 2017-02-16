module.exports = function(app) {
	app.get("/api/user", findUser);
	app.get("/api/user/:uid", findUserById);
	app.put("/api/user/:uid", updateUser);
	app.delete("/api/user/:uid", deleteUser);
	app.post("/api/user", createUser);

	var users = [
		{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
		{_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
		{_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
		{_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
	];

	function createUser(req, res) {
		var user = req.body;
		var u = {
    		"_id": (new Date()).getTime().toString(),
    		"username": user.username,
    		"password": user.password
    	}
    	users.push(u);
    	res.json(u);
	}

	function deleteUser(req, res) {
		var userId = req.params.uid;
		for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                users.splice(u, 1);
                res.json(user);
                break;
            }
        }
        return null;
	}

	function updateUser(req, res) {
		var userId = req.params.uid;
		var newUser = req.body;
		for(var u in users) {
	        var user = users[u];
	        if( user._id === userId ) {
	            users[u].firstName = newUser.firstName;
	            users[u].lastName = newUser.lastName;
	            users[u].email = newUser.email;
	            res.json(user);
	            break;
	        }
	    }
	    return null;
	}

	function findUserById(req, res) {
		//retrieve the id from the path
		var userId = req.params.uid;
		var user = users.find(function(u) {
			return u._id == userId;
		});
		res.json(user); //faster than send, only knows how to send back json
	}

	function findUser(req, res) {
		var username = req.query.username;
		var password = req.query.password;
		if (username && password) {
			findUserByCredentials(req, res);
		} else if (username) {
			findUserByUsername(req, res);
		}

	}

	function findUserByUsername(req, res) {
		var user = users.find(function(u) {
			return u.username == req.query.username;
		});

		if(user) {
			res.json(user);
		} else {
			res.sendStatus(404).send({message: "User Not Found"});
		}
	}

	function findUserByCredentials(req, res) { //request and response
		var username = req.query.username;
		var password = req.query.password;

		var user = users.find(function(user) {
			return user.password == password && user.username == username;
		});

		// res.send(user); //send the user object back to the client
		res.json(user);
	}
}