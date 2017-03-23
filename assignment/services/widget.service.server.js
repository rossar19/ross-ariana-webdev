module.exports = function(app, model) {
	app.post("/api/page/:pid/widget", createWidget);
	app.get("/api/page/:pid/widget", findWidgetsByPageId);
	app.get("/api/widget/:wgid", findWidgetById);
	app.put("/api/widget/:wgid", updateWidget);
	app.delete("/api/widget/:wgid", deleteWidget);
	app.put("/api/page/:pid/widget", sortWidget);

	var multer = require ('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
	app.post("/api/upload", upload.single('widgetUpload'), uploadImage);

	var widgetModel = model.widgetModel;

	// var widgets = [
	// 	{ "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
	// 	{ "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
	// 	{ "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
	// 	    "url": "http://lorempixel.com/400/200/"},
	// 	{ "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
	// 	{ "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
	// 	{ "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
	// 	    "url": "https://youtu.be/AM2Ivdi9c4E" },
	// 	{ "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
	// ]

	function createWidget(req, res) {
		var pageId = req.params.pid;
		var widget = req.body;

		widgetModel
			.createWidget(pageId, widget)
			.then(function(w) {
				res.json(w);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
		// var w = {
		// 	"_id": (new Date()).getTime().toString(),
		// 	"widgetType": widget.widgetType,
		// 	"pageId": pageId,
		// 	"size": widget.size,
		// 	"text": widget.text
		// }
		// widgets.push(w);
		// res.json(w);
	}

	function findWidgetsByPageId(req, res) {
		var pageId = req.params.pid;

		widgetModel
			.findAllWidgetsForPage(pageId)
			.then(function(widgets) {
				res.json(widgets);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findWidgetById(req, res) {
		var widgetId = req.params.wgid;

		widgetModel
			.findWidgetById(widgetId)
			.then(function(w) {
				res.json(w);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function updateWidget(req, res) {
		var widgetId = req.params.wgid;
		var newWidget = req.body;

		widgetModel
			.updateWidget(widgetId, newWidget)
			.then(function(w) {
				res.send(w);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
        // for(var w in widgets) {
        //     var widget = widgets[w];
        //     if( widget._id === widgetId ) {
        //     	widgets[w].widgetType = newWidget.widgetType;
        //         widgets[w].size = newWidget.size;
        //         widgets[w].text = newWidget.text;
        //         res.json(widget);
        //     }
        // }
        // return null;
	}

	function deleteWidget(req, res) {
		var widgetId = req.params.wgid;

		widgetModel
			.deleteWidget(widgetId)
			.then(function(status) {
				res.send(status);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function sortWidget(req, res) {
		var pageId = req.params.pid;
		var start = req.query.initial;
		var end = req.query.final;
		// var item = widgets[initInt];

		widgetModel
			.reorderWidget(pageId, start, end)
			.then(function(widgets) {
				res.json(widgets);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
		// if (initInt != finalInt) {
		// 	widgets.splice(initInt, 1);
		// 	widgets.splice(finalInt, 0, item);
		// }
		// res.json(widgets);
	}

	function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var myFile        = req.file;
        // var filename = myFile.name;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

		widgetModel
			.findWidgetById(widgetId)
			.then(function(w) {
		        var widget = w;
				widget.url = '/../../uploads/'+filename;
				widget.width = "100%";

		        var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/" + pageId + "/widget/"+widgetId;

		        res.redirect(callbackUrl);
			})
    }
}