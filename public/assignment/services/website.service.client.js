(function() {
	angular
		.module("WebAppMaker")
		.factory("WebsiteService", websiteService);

	function websiteService() {
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
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser
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
					sites.push(websites[w].developerId);
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
			var website = findWebsiteById(websiteId);
			if (website != null) {
				website.name = newWebsite.name;
				website.description = newWebsite.description;
			}
		}

		// removes the website from local websites array whose _id matches the websiteId parameter
		function deleteWebsite(websiteId) {
			websites.splice(websites.indexOf(findWebsiteById(websiteId)), 1);
		}

        // creates an ID for new users
        function generateWebId() {
        	var temp = Math.random() * 1000;
        	if (findWebsiteById(temp) != null) {
        		generateWebId();
        	}

        	return temp;
        }

        // adds the website parameter instance to the local websites array.
		// The new website's developerId is set to the userId parameter
		function createWebsite(userId, website) {
			var w = {
				"_id": generateWebId(),
				"name": website.name,
				"developerId": userId,
				"description": "Lorem" 
			}

			websites.push(w);

		}
	}
})();