module.exports = function(app) {
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

	var websites = [
		{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
		{ "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
		{ "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
		{ "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
		{ "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
		{ "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
	];

	function createWebsite(req, res) {
		var userId = req.params.uid;
		var website = req.body;
		var w = {
			"_id": (new Date()).getTime().toString(),
			"name": website.name,
			"developerId": userId,
			"description": website.description 
		}
		websites.push(w);
		res.json(w);
	}

	function findWebsitesByUser(req, res) {
		var userId = req.params.uid;
		var sites = [];
		for (var w in websites) {
			if (userId == websites[w].developerId) {
				sites.push(websites[w]);
			}
		}
		res.json(sites);
	}
	
	function findWebsiteById(req, res) {
		var websiteId = req.params.wid;
		var website = websites.find(function(w) {
			return w._id == websiteId;
		});
		res.json(website);
	}
	
	function updateWebsite(req, res) {
		var websiteId = req.params.wid;
		var newWebsite = req.body;
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId ) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.json(website);
                break;
            }
        }
        return null;
	}
	
	function deleteWebsite(req, res) {
		var websiteId = req.params.wid;
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId ) {
				websites.splice(w, 1);
                res.send(200);
            }
        }
        return null;
	}
}