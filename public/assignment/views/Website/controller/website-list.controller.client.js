(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);
    
    function websiteListController($routeParams, WebsiteService) {
		var vm = this;
		vm.userId = $routeParams["uid"];
		function init() {
			WebsiteService
				.findWebsitesByUser(vm.userId)
				.success(function(websites) {
					vm.websites = websites;
				});
		}
		init();
    }
})();