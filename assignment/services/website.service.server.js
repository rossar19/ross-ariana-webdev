module.exports = function(app, model) {
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

	// var websites = [
	// 	{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
	// 	{ "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
	// 	{ "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
	// 	{ "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
	// 	{ "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
	// 	{ "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
	// ];

	var websiteModel = model.websiteModel;

	function createWebsite(req, res) {
		var userId = req.params.uid;
		var website = req.body;

		websiteModel
			.createWebsiteForUser(userId, website)
			.then(function(w) {
				res.json(w);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findWebsitesByUser(req, res) {
		var userId = req.params.uid;

		websiteModel
			.findAllWebsitesForUser(userId)
			.then(function(websites) {
				res.json(websites);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}
	
	function findWebsiteById(req, res) {
		var websiteId = req.params.wid;

		websiteModel
			.findWebsiteById(websiteId)
			.then(function(w) {
				res.json(w);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}
	
	function updateWebsite(req, res) {
		var websiteId = req.params.wid;
		var newWebsite = req.body;

		websiteModel
			.updateWebsite(websiteId, newWebsite)
			.then(function(w) {
				res.send(w);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}
	
	function deleteWebsite(req, res) {
		var websiteId = req.params.wid;

		websiteModel
			.deleteWebsite(websiteId)
			.then(function(status) {
				res.send(status);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}
}