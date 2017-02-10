(function() {
	angular
		.model("WebAppMaker")
		.factory("UserService", userService);

	function userService() {
		var users = [
			{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
			{_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
			{_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
			{_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
		];

		var api = {
            "users": users,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername
        };
        return api;

        // returns the user in local users array whose _id matches the userId parameter
        function findUserById(userId) {
        	for(var u in users) {
                if( users[u]._id === userId ) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        // removes the user whose _id matches the userId parameter
        function deleteUser(userId) {
        	users.splice(users.indexOf(findUserById(userId)), 1);
        }

        // updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId, newUser) {
        	var user = findUserById(userId);
        	if (user != null) {
        		user.firstName = newUser.firstName;
        		user.lastName = newUser.lastName;
        	}

            return user;
        }

        // returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username, password) {
        	for (var u in users) {
        		if ((username == users[u].username) 
        			&& (password == users[u].password)) {
        			return angular.copy(users[u]);
        		}
        	}
        	return null;
        }

        // returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username) {
        	for (var u in users) {
        		if (username == users[u].username) {
        			return angular.copy(users[u]);
        		}
        	}
        	return null;
        }

        // creates an ID for new users
        function generateUserId() {
        	var temp = Math.random() * 1000;
        	if (findUserById(temp) != null) {
        		generateUserId();
        	}

        	return temp;
        }

        // adds the user parameter instance to the local users array
        function createUser(user) {
        	var u = {
        		"_id": generateUserId,
        		"username": user.username,
        		"password": user.password,
        		"firstName": user.firstName,
        		"lastName": user.lastName
        	}
        	users.push(u);
        }
	}
})