module.exports = function(app) {
    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByUser);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

	var pages = [
		{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
		{ "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
		{ "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
	];

	function createPage(req, res) {
		var webId = req.params.wid;
		var page = req.body;
		var p = {
			"_id": (new Date()).getTime().toString(),
			"name": page.name,
			"websiteId": webId,
			"description": page.description 
		}
		pages.push(p);
		res.json(p);
	}

	function findPagesByUser(req, res) {
		var websiteId = req.params.wid;
		var ps = [];
		for (var p in pages) {
			if (websiteId == pages[p].websiteId) {
				ps.push(pages[p]);
			}
		}
		res.json(ps);
	}

	function findPageById(req, res) {
		var pageId = req.params.pid;
		var page = pages.find(function(p) {
			return p._id == pageId;
		});
		res.json(page);
	}

	function updatePage(req, res) {
		var pageId = req.params.pid;
		var newPage = req.body;
		for(var p in pages) {
            var page = pages[p];
            if( page._id === pageId ) {
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.json(page);
            }
        }
        return null;
	}

	function deletePage(req, res) {
		var pageId = req.params.pid;
        for(var p in pages) {
            var page = pages[p];
            if( page._id === pageId ) {
				pages.splice(p, 1);
                res.send(200);
            }
        }
        return null;
	}
}