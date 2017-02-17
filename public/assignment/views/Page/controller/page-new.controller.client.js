(function(){
    angular
        .module("WebAppMaker")
        .controller("newPageController", newPageController);
    
    function newPageController($routeParams, PageService, $location) {
    	var vm = this;
    	vm.userId = $routeParams["uid"];
    	vm.webId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
    	vm.create = create;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .success(function(page) {
                    vm.page = page;
                });
            PageService
                .findPagesByWebsiteId(vm.webId)
                .success(function(page) {
                    vm.pages = page;
                });
        }
        init();

		function isValidPage(newPage) {
			return !angular.isUndefined(newPage) 
    			&& !angular.isUndefined(newPage.name) 
    			&& !angular.isUndefined(newPage.description)
    			&& newPage.name != ''
    			&& newPage.description != '';
		}

    	function create(newPage) {
			if (isValidPage(newPage)) {
    			PageService
                    .createPage(vm.webId, newPage)
                    .success(function(page) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                    });
			} else {
				vm.error = 'Please fill out all fields';
			}
    	}
    }
})();