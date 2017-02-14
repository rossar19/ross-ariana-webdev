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
			vm.user = UserService.findUserById(vm.userId);
		}
		init();

        function update(newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.success = "user successfully updated"
            }
        };

        function remove(user) {
            UserService.deleteUser(vm.userId);
            $location.url("/login");
        }

        var user = UserService.findUserById(vm.userId);
        vm.user = user;
    }
})();