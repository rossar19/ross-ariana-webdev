(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);
    
    function widgetListController($sce, $routeParams, WidgetService, PageService) {
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
            
        var array = [];

        PageService
            .findPageById(vm.pageId)
            .then(function(page) {
                page.widgets.forEach(function(w) {
                    WidgetService
                        .findWidgetById(w)
                        .then(function(wig) {
                            array.push(wig);
                        })
                })
                vm.widgets = array;
            })

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