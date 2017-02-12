(function() {
	angular
		.module("WebAppMaker")
		.factory("WebsiteService", WebsiteService);

	function WebsiteService() {
		var websites = [
			{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
			{ "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
			{ "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
			{ "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
			{ "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
			{ "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
		];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

		// adds the website parameter instance to the local websites array.
		// The new website's developerId is set to the userId parameter
		function createWebsite(userId, website) {
			var w = {
				"_id": generateWebId(),
				"name": website.name,
				"developerId": userId,
				"description": website.description 
			}
			websites.push(w);
		}

		// retrieves the websites in local websites array whose developerId matches the parameter userId
		function findWebsitesByUser(userId) {
			var sites = [];
			for (var w in websites) {
				if (userId == websites[w].developerId) {
					sites.push(websites[w]);
				}
			}
			return sites;
		}

		// retrieves the website in local websites array whose _id matches the websiteId parameter
		function findWebsiteById(websiteId) {
			for (var w in websites) {
				if (websiteId == websites[w]._id) {
					return angular.copy(websites[w]);
				}
			}
			return null;
		}

		// updates the website in local websites array whose _id matches the websiteId parameter
		function updateWebsite(websiteId, newWebsite) {
            for(var w in websites) {
                var website = websites[w];
                if( website._id === websiteId ) {
                    websites[w].name = newWebsite.name;
                    websites[w].description = newWebsite.description;
                    return website;
                }
            }
            return null;
		}

		// removes the website from local websites array whose _id matches the websiteId parameter
		function deleteWebsite(websiteId) {
            for(var w in websites) {
                var website = websites[w];
                if( website._id === websiteId ) {
					websites.splice(w, 1);
                    return;
                }
            }
            return null;
		}

        // creates an ID for new users
        function generateWebId() {
        	var temp = Math.floor(Math.random() * 1000);
        	if (findWebsiteById(temp) != null) {
        		generateWebId();
        	}

        	return temp.toString();
        }

        // adds the website parameter instance to the local websites array.
		// The new website's developerId is set to the userId parameter
		function createWebsite(userId, website) {
			var w = {
				"_id": generateWebId(),
				"name": website.name,
				"developerId": userId,
				"description": website.description 
			}

			websites.push(w);

		}
	}
})();