module.exports = function(app, model) {
    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByUser);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    var pageModel = model.pageModel;

	// var pages = [
	// 	{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
	// 	{ "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
	// 	{ "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
	// ];

	function createPage(req, res) {
		var webId = req.params.wid;
		var page = req.body;

		pageModel
			.createPage(webId, page)
			.then(function(p) {
				res.json(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findPagesByUser(req, res) {
		var websiteId = req.params.wid;
		
		pageModel
			.findAllPagesForWebsite(websiteId)
			.then(function(pages) {
				res.json(pages);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findPageById(req, res) {
		var pageId = req.params.pid;

		pageModel
			.findPageById(pageId)
			.then(function(p) {
				res.json(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function updatePage(req, res) {
		var pageId = req.params.pid;
		var newPage = req.body;

		pageModel
			.updatePage(pageId, newPage)
			.then(function(p) {
				res.send(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function deletePage(req, res) {
		var pageId = req.params.pid;

		pageModel
			.deletePage(pageId)
			.then(function(status) {
				res.send(status);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}
}