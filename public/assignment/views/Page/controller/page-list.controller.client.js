(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);
    
    function pageListController($routeParams, PageService) {
    	var vm = this;
    	vm.userId = $routeParams["uid"];
    	vm.webId = $routeParams["wid"];

    	function init() {
    		vm.pages = PageService.findPagesByWebsiteId(vm.webId);
    	}
    	init();
    }
})();