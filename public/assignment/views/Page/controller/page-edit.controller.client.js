(function(){
    angular
        .module("WebAppMaker")
        .controller("editPageController", editPageController);
    
    function editPageController($routeParams, PageService, $location) {
    	var vm = this;
    	vm.pageId = $routeParams["pid"];
    	vm.userId = $routeParams["uid"];
    	vm.update = update;
    	vm.remove = remove;

    	function init() {
    		vm.page = PageService.findPageById(vm.pageId);
    	}
    	init();

    	function update(newPage) {
    		var page = PageService.updatePage(vm.pageId, newPage);
    		if (page == null) {
    			vm.error = 'Oops!  There was a problem updating your page.'
    		} else {
    			$location.url("/user/" + vm.userId + "/website/" + vm.page.websiteId + "/page");
    		}
    	}

    	function remove(page) {
    		PageService.deletePage(vm.pageId);
    		$location.url("/user/" + vm.userId + "/website/" + vm.page.websiteId + "/page");
    	}

        var page = PageService.findPageById(vm.pageId);
        vm.page = page;
    }
})();