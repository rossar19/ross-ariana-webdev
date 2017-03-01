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
                .success(function(widget) {
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
                .success(function(widget) {
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
                .success(function(res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }

        // $(document).ready(function() {

        //     $('#uploadForm').submit(function(e) {
        //         e.preventDefault();
        //         console.log("submitted");
        //         $.ajax({
        //             success: function(res) {
        //                 console.log("success");
        //                 $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        //             }
        //         })
        //     });
        // });

        // function upload() {
        //     var file = $('#widgetUpload')[0].files[0];
        //     var ob = new Object();
        //     ob.name = $('#widgetUpload')[0].files[0];
        //     var Result= JSON.stringify(ob);
        //     var oba = new Object();
        //     oba.name = $('#uploadForm')[0];
        //     console.log(Result);
        //     console.log(ob);
        //     console.log(file);
        //     console.log(oba);
        //     WidgetService
        //         .uploadImage(vm.widgetId, oba)
        //         .success(function(res) {
        //             console.log("uploaded");
        //             console.log(res);
        //         })
        // }
    }
})();