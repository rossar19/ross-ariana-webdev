(function() {
	angular
		.module("WebAppMaker")
		.factory("WebsiteService", WebsiteService);

	function WebsiteService($http) {

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
			return $http.post("/api/user/"+userId+"/website", website);
		}

		// retrieves the websites in local websites array whose developerId matches the parameter userId
		function findWebsitesByUser(userId) {
			return $http.get("/api/user/"+userId+"/website");
		}

		// retrieves the website in local websites array whose _id matches the websiteId parameter
		function findWebsiteById(websiteId) {
			return $http.get("/api/website/"+websiteId);
		}

		// updates the website in local websites array whose _id matches the websiteId parameter
		function updateWebsite(websiteId, newWebsite) {
			return $http.put("/api/website/"+websiteId, newWebsite);
		}

		// removes the website from local websites array whose _id matches the websiteId parameter
		function deleteWebsite(websiteId) {
			return $http.delete("/api/website/"+websiteId);
		}
	}
})();