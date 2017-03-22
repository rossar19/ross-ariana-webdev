(function(){
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);
    
    function editWebsiteController($routeParams, WebsiteService, $location) {
    	var vm = this;
    	vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.update = update;
        vm.remove = remove;

		function init() {
			WebsiteService
                .findWebsiteById(vm.webId)
                .then(function(website) {
                    vm.web = website;
                });

			WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function(websites) {
                    vm.websites = websites;
                });
		}
		init();

        function update(newWeb) {
            WebsiteService
                .updateWebsite(vm.webId, newWeb)
                .then(function(website) {
                    var web = website;
                    if(web == null) {
                        vm.error = "Unable to update website";
                    } else {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                });
        };

        function remove(website) {
        	WebsiteService
                .deleteWebsite(vm.webId)
                .then(function(status) {
                    $location.url("/user/" + vm.userId + "/website");
                });
        }

        var web = WebsiteService.findWebsiteById(vm.webId);
        vm.web = web;
    }
})();