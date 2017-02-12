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
    			&& user.verpass == user.password
    			&& UserService.findUserByUsername(user.username) == null;
    	}

    	function register(user) {
    		if (isValidRegistration(user)) {
    			UserService.createUser(user);
    			user = UserService.findUserByUsername(user.username);
    			$location.url("/user/" + user._id);
    		} else {
    			vm.error = 'Hmm...looks like there are some issues with your registration.';
    		}
    	}
    }
})();