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
        // vm.upload = upload;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(widget) {
                    vm.widget = widget;
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/Widget/template/editors/widget-'+ type +'-editor.view.client.html';
        }

        function update(newWidget) {
            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .then(function(widget) {
                    var widget = widget;

                    if(widget == null) {
                        vm.error = "Unable to update widget";
                    } else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                });
        }

        function remove(widget) {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }
    }
})();