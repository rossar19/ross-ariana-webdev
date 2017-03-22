(function(){
    angular
        .module("WebAppMaker")
        .controller("editPageController", editPageController);
    
    function editPageController($routeParams, PageService, $location) {
    	var vm = this;
    	vm.pageId = $routeParams["pid"];
    	vm.userId = $routeParams["uid"];
        vm.webId = $routeParams["wid"];
    	vm.update = update;
    	vm.remove = remove;

    	function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function(page) {
                    vm.page = page;
                });
            PageService
                .findPagesByWebsiteId(vm.webId)
                .then(function(pages) {
                    vm.pages = pages;
                });
    	}
    	init();

    	function update(newPage) {
    		PageService
                .updatePage(vm.pageId, newPage)
                .then(function(page) {
                    var page = page;
                    if (page == null) {
                        vm.error = 'Oops!  There was a problem updating your page.'
                    } else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                    }
                });
    	}

    	function remove(page) {
    		PageService
                .deletePage(vm.pageId).
                then(function() {
                    $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                });
    	}

        var page = PageService.findPageById(vm.pageId);
        vm.page = page;
    }
})();