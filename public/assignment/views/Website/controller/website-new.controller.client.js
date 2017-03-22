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
			// WebsiteService
   //              .findWebsiteById(vm.webId)
   //              .then(function(website) {
   //                  vm.web = website;
   //              });

			WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function(websites) {
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
					.then(function(website) {
						//add website to user's array
						$location.url("/user/" + vm.userId + "/website");
					});
			} else {
				vm.error = 'Please fill out all fields';
			}
		}
    }
})();