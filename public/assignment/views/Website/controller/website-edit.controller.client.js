(function(){
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);
    
    function editWebsiteController($routeParams, WebsiteService, $location) {
    	var vm = this;
    	vm.webId = $routeParams["wid"];
        vm.update = update;
        vm.remove = remove;

		function init() {
			WebsiteService
                .findWebsiteById(vm.webId)
                .success(function(website) {
                    vm.web = website;
                });

			WebsiteService
                .findWebsitesByUser(vm.webId)
                .success(function(websites) {
                    vm.websites = websites;
                });
		}
		init();

        function update(newWeb) {
            WebsiteService
                .updateWebsite(vm.webId, newWeb)
                .success(function(website) {
                    var web = website;
                    if(web == null) {
                        vm.error = "Unable to update website";
                    } else {
                        $location.url("/user/" + vm.web.developerId + "/website");
                    }
                });
        };

        function remove(website) {
        	WebsiteService
                .deleteWebsite(vm.webId)
                .success(function() {
                    $location.url("/user/" + vm.web.developerId + "/website");
                });
        }

        var web = WebsiteService.findWebsiteById(vm.webId);
        vm.web = web;
    }
})();