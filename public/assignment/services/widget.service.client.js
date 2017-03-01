(function() {
	angular
		.module("WebAppMaker")
		.factory("WidgetService", WidgetService);

	function WidgetService($http) {
		var api = {
			"createWidget": createWidget,
			"findWidgetsByPageId": findWidgetsByPageId,
			"findWidgetById": findWidgetById,
			"updateWidget": updateWidget,
			"deleteWidget": deleteWidget,
			"sortWidget": sortWidget
			// "uploadImage": uploadImage
		}
		return api;

		// adds the widget parameter instance to the local widgets array. The new widget's pageId is set to the pageId parameter
		function createWidget(pageId, widget) {
			return $http.post("/api/page/"+pageId+"/widget", widget);
		}

		// retrieves the widgets in local widgets array whose pageId matches the parameter pageId
		function findWidgetsByPageId(pageId) {
			return $http.get("/api/page/"+pageId+"/widget");
		}

		// retrieves the widget in local widgets array whose _id matches the widgetId parameter
		function findWidgetById(widgetId) {
			return $http.get("/api/widget/"+widgetId);
		}
		
		// updates the widget in local widgets array whose _id matches the widgetId parameter
		function updateWidget(widgetId, newWidget) {
			return $http.put("/api/widget/"+widgetId, newWidget);
		}

		// removes the widget from local widgets array whose _id matches the widgetId parameter
		function deleteWidget(widgetId) {
			return $http.delete("/api/widget/"+widgetId);
		}

		function sortWidget(pageId, index1, index2) {
			return $http.put("/api/page/"+pageId+"/widget?initial="+index1+"&final="+index2);
		}

		// function uploadImage(widgetId, file) {
		// 	return $http.put("/api/upload?widget="+widgetId, file);
		// }
	}
})();