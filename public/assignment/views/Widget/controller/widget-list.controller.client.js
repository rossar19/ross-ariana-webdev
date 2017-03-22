(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);
    
    function widgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        WidgetService
            .findWidgetsByPageId(vm.pageId)
            .then(function(widgets) {
                vm.widgets = widgets;
            });

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/template/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
        
        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function sort() {
            WidgetService
                .sortWidget(vm.pageId, initInt, finalInt)
                .then(function(widgets) {
                    vm.widgets = widgets;
                })
        }
    }
})();