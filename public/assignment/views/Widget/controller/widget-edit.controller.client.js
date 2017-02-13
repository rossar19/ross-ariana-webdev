(function(){
    angular
        .module("WebAppMaker")
        .controller("editWidgetController", editWidgetController);
    
    function editWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams["wgid"];
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.update = update;
        vm.remove = remove;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/template/editors/widget-'+ type +'-editor.view.client.html';
        }

        function update(newWidget) {
            var widget = WidgetService.updateWidget(vm.widgetId, newWidget);
            if(widget == null) {
                vm.error = "Unable to update widget";
            } else {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
        }

        function remove(widget) {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();