(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);
    
    function registerController(UserService, $location) {
    	var vm = this;
    	vm.register = register;

    	function isValidRegistration(user) {
    		return !angular.isUndefined(user) 
    			&& !angular.isUndefined(user.username) 
    			&& !angular.isUndefined(user.password)
    			&& !angular.isUndefined(user.verpass)
    			&& user.username != ''
    			&& user.password != ''
    			&& user.verpass != ''
    			&& user.verpass == user.password;
    	}

    	function register(user) {
    		if (isValidRegistration(user)) {
    			UserService
                    .findUserByUsername(user.username)
                    .then(function(newUser) {
                        if(newUser.message) {
                            vm.error = 'Available';
                            UserService
                                .createUser(user)
                                .then(function(user) {
                                    $location.url("/user/" + user._id);
                                });
                        } else { vm.error = "That Username is taken"; }
                    }, function(err) {
                        vm.error = "Something went horribly wrong...";
                    });
    		} else {
    			vm.error = 'Please fill out all fields';
    		}
    	}
    }
})();