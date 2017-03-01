(function() {
	angular
		.module('jgaDirectives', [])
		.directive('jgaSortable', jgaSortable);

	function jgaSortable($routeParams, WidgetService) {
		function linkFunction(scope, element) {
			var init;
			var final;
			var pid = $routeParams.pid;
			$(element).sortable({
                axis: "y",
                handle: ".glyphicon-menu-hamburger",
                start: function(event, ui) {
                	init = ui.item.index();
                },
                stop: function(event, ui) {
                	final = ui.item.index();
                	WidgetService
                		.sortWidget(pid, init, final)
                		.success(function(o) {});
                }
            });
		}

		return {
			link: linkFunction
		}

	}
})();