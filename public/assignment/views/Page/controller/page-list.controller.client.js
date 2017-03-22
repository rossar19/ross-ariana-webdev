(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);
    
    function pageListController($routeParams, PageService) {
    	var vm = this;
    	vm.userId = $routeParams["uid"];
    	vm.webId = $routeParams["wid"];

    	function init() {
    		PageService
                .findPagesByWebsiteId(vm.webId)
                .then(function(pages) {
                    vm.pages = pages;
                });
    	}
    	init();
    }
})();