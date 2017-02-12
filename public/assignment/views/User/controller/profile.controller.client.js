(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($routeParams, UserService) {
    	var vm = this;
    	var userId = $routeParams["userId"];
		function init() {
			vm.user = UserService.findUserById(vm.userId);
		}
		init();
    }
})();