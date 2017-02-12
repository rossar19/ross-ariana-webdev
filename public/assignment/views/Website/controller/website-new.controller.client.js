(function(){
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);
    
    function newWebsiteController($routeParams, WebsiteService, $location) {
		var vm = this;
		vm.userId = $routeParams["uid"];
		vm.create = create;

		function init() {
			vm.website = WebsiteService.findWebsiteById(vm.userId);
			vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
		}
		init();

		function isValidWebsite(newWeb) {
			return !angular.isUndefined(newWeb) 
    			&& !angular.isUndefined(newWeb.name) 
    			&& !angular.isUndefined(newWeb.description)
    			&& newWeb.name != ''
    			&& newWeb.description != '';
		}

		function create(newWeb) {
			if (isValidWebsite(newWeb)) {
				WebsiteService.createWebsite(vm.userId, newWeb);
				$location.url("/user/" + vm.userId + "/website");
			} else {
				vm.error = 'Please fill out all fields';
			}
		}
    }
})();