(function(){
    angular
        .module("WebAppMaker")
        .controller("newWidgetController", newWidgetController);
    
    function newWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams["wgid"];
        // vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.create = create;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function create(type) {
            var w = { "widgetType": type };
            var newWidget = WidgetService.createWidget(vm.pageId, w);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }
})();