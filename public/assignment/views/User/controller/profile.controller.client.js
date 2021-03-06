(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($routeParams, UserService, $location) {
    	var vm = this;
    	vm.userId = $routeParams["uid"];
        vm.update = update;
        vm.remove = remove;

		function init() {
			UserService
                .findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user;
                });
		}
		init();

        function update(newUser) {
            UserService
            .updateUser(vm.userId, newUser)
            .then(function(user) {
                if(user == null) {
                    vm.error = "unable to update user";
                } else {
                    vm.success = "user successfully updated"
                }
            });
        };

        function remove(user) {
            UserService
                .deleteUser(vm.userId)
                .then(function(user) {
                    $location.url("/login");
                });
        }

        var user = UserService.findUserById(vm.userId);
        vm.user = user;
    }
})();