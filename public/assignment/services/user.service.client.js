(function() {
	angular
		.module("WebAppMaker")
		.factory("UserService", UserService);

	function UserService() {
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
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users.splice(u, 1);
                    return;
                }
            }
            return null;
        }

        // updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    return user;
                }
            }
            return null;
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
        	var temp = Math.floor(Math.random() * 1000);
        	if (findUserById(temp) != null) {
        		generateUserId();
        	}

        	return temp.toString();
        }

        // adds the user parameter instance to the local users array
        function createUser(user) {
        	var u = {
        		"_id": generateUserId(),
        		"username": user.username,
        		"password": user.password
        		// "firstName": user.firstName,
        		// "lastName": user.lastName
        	}
        	users.push(u);
        }
	}
})();