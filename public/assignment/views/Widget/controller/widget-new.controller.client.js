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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(widget) {
                    vm.widget = widget;
                });
        }
        init();

        function create(type) {
            var w = { "type": type };
            WidgetService
                .createWidget(vm.pageId, w)
                .then(function(widget) {
                    var newWidget = widget;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                });
        }
    }
})();