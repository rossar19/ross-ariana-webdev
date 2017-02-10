(function() {
	angular
		.model("WebAppMaker")
		.factory("WidgetService", widgetService);

	function widgetService() {
		var widgets = [
			{ "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
			{ "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
			{ "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
			    "url": "http://lorempixel.com/400/200/"},
			{ "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
			{ "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
			{ "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
			    "url": "https://youtu.be/AM2Ivdi9c4E" },
			{ "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
		]

		var api = {
			"createWidget": createWidget,
			"findWidgetsByPageId": findWidgetsByPageId,
			"findWidgetById": findWidgetById,
			"updateWidget": updateWidget,
			"deleteWidget": deleteWidget
		}
		return api;

		// retrieves the widgets in local widgets array whose pageId matches the parameter pageId
		function findWidgetsByPageId(pageId) {
			for (var w in widgets) {
				if (pageId == widgets[w].pageId) {
					return angular.copy(widgets[w]);
				}
			}
			return null;
		}

		// retrieves the widget in local widgets array whose _id matches the widgetId parameter
		function findWidgetById(widgetId) {
			for (var w in widgets) {
				if (widgetId == widgets[w]._id) {
					return angular.copy(widgets[w]);
				}
			}
			return null;
		}
		
		// updates the widget in local widgets array whose _id matches the widgetId parameter
		function updateWidget(widgetId, newWidget) {
			var widget = findWidgetById(widgetId);
			widget.widgetType = newWidget.widgetType;
			widget.size = widget.size;
			widget.text = widget.text;
		}

		// removes the widget from local widgets array whose _id matches the widgetId parameter
		function deleteWidget(widgetId) {
			if (findWidgetById(widgetId) != null) {
				widgets.splice(widgets.indexOf(findWidgetById(widgetId)), 1);
			}
		}

        // creates an ID for new users
        function generateWigId() {
        	var temp = Math.random() * 1000;
        	if (findWidgetById(temp) != null) {
        		generateWigId();
        	}
        	return temp;
        }

		// adds the widget parameter instance to the local widgets array. The new widget's pageId is set to the pageId parameter
		function createWidget(pageId, widget) {
			var w = {
				"_id": generateWigId,
				"widgetType": widget.widgetType,
				"pageId": pageId,
				"size": widget.size,
				"text": widget.text
			}

			widgets.push(w);
		}
	}
})