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
			vm.web = WebsiteService.findWebsiteById(vm.webId);
			vm.websites = WebsiteService.findWebsitesByUser(vm.web.developerId);
		}
		init();

        function update(newWeb) {
            var web = WebsiteService.updateWebsite(vm.webId, newWeb);
            if(web == null) {
                vm.error = "Unable to update website";
            } else {
            	$location.url("/user/" + vm.web.developerId + "/website");
            }
        };

        function remove(website) {
        	WebsiteService.deleteWebsite(vm.webId);
        	$location.url("/user/" + vm.web.developerId + "/website");
        }

        var web = WebsiteService.findWebsiteById(vm.webId);
        vm.web = web;
    }
})();