(function(){
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);
    
    function newWebsiteController($routeParams, WebsiteService, $location) {
		var vm = this;
		vm.userId = $routeParams["uid"];
    	vm.webId = $routeParams["wid"];
		vm.create = create;

		function init() {
			WebsiteService
                .findWebsiteById(vm.webId)
                .success(function(website) {
                    vm.web = website;
                });

			WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function(websites) {
                    vm.websites = websites;
                });
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
				WebsiteService
					.createWebsite(vm.userId, newWeb)
					.success(function(website) {
						$location.url("/user/" + vm.userId + "/website");
					});
			} else {
				vm.error = 'Please fill out all fields';
			}
		}
    }
})();