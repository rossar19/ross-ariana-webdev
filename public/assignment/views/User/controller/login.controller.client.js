(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);
    
    function loginController(UserService, $location) {
    	var vm = this;
    	vm.login = login;

    	function isValidLogin(user) {
    		return !angular.isUndefined(user) 
    			&& !angular.isUndefined(user.username) 
    			&& !angular.isUndefined(user.password)
    			&& user.username != ''
    			&& user.password != '';
    	}

	    function login(user) {
	    	if (isValidLogin(user)) {
		        var promise = UserService.findUserByCredentials(user.username, user.password);
                promise.success(function(user) { //returns the object that we get from the server
                    if(user) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.error = 'User not found';
                    }
                })
		        
			} else {
	        	vm.error = 'Please fill out all fields';
	        }
	    }
    }
})();