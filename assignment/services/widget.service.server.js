module.exports = function(app) {
	app.post("/api/page/:pid/widget", createWidget);
	app.get("/api/page/:pid/widget", findWidgetsByPageId);
	app.get("/api/widget/:wgid", findWidgetById);
	app.put("/api/widget/:wgid", updateWidget);
	app.delete("/api/widget/:wgid", deleteWidget);
	app.put("/api/page/:pid/widget", sortWidget);

	var multer = require ('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
	app.post("/api/upload", upload.single('widgetUpload'), uploadImage);

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

	function createWidget(req, res) {
		var pageId = req.params.pid;
		var widget = req.body;
		var w = {
			"_id": (new Date()).getTime().toString(),
			"widgetType": widget.widgetType,
			"pageId": pageId,
			"size": widget.size,
			"text": widget.text
		}
		widgets.push(w);
		res.json(w);
	}

	function findWidgetsByPageId(req, res) {
		var pageId = req.params.pid;
		var wigs = [];
		for (var w in widgets) {
			if (pageId == widgets[w].pageId) {
				wigs.push(widgets[w]);
			}
		}
		res.json(wigs);
	}

	function findWidgetById(req, res) {
		var widgetId = req.params.wgid;
		var widget = widgets.find(function(w) {
			return widgetId == w._id
		});
		res.json(widget);
	}

	function updateWidget(req, res) {
		var widgetId = req.params.wgid;
		var newWidget = req.body;
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === widgetId ) {
            	widgets[w].widgetType = newWidget.widgetType;
                widgets[w].size = newWidget.size;
                widgets[w].text = newWidget.text;
                res.json(widget);
            }
        }
        return null;
	}

	function deleteWidget(req, res) {
		var widgetId = req.params.wgid;
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === widgetId ) {
				widgets.splice(w, 1);
                res.send(200);
            }
        }
        return null;
	}

	function sortWidget(req, res) {
		var pageId = req.params.pid;
		var initInt = req.query.initial;
		var finalInt = req.query.final;
		var item = widgets[initInt];
		if (initInt != finalInt) {
			widgets.splice(initInt, 1);
			widgets.splice(finalInt, 0, item);
		}
		res.json(widgets);
	}

	function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var myFile        = req.file;
        // var filename = myFile.name;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = widgets.find(function(w) {
			return widgetId == w._id
		});

		widget.url = '/../../uploads/'+filename;
		widget.width = "100%";
        res.json(widget);
    }
}