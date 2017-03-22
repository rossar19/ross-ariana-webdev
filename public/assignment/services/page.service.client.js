(function() {
	angular
		.module("WebAppMaker")
		.factory("PageService", PageService);

	function PageService($http) {

		var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
		}
		return api;

		// adds the page parameter instance to the local pages array. The new page's websiteId is set to the websiteId parameter
		function createPage(websiteId, page) {
			return $http.post("/api/website/"+websiteId+"/page", page)
                .then(function (response) {
                    return response.data;
                });
		}

		// retrieves the pages in local pages array whose websiteId matches the parameter websiteId
		function findPagesByWebsiteId(websiteId) {
			return $http.get("/api/website/"+websiteId+"/page")
                .then(function (response) {
                    return response.data;
                });
		}
		
		// retrieves the page in local pages array whose _id matches the pageId parameter
		function findPageById(pageId) {
			return $http.get("/api/page/"+pageId)
                .then(function (response) {
                    return response.data;
                });
		}
		
		// updates the page in local pages array whose _id matches the pageId parameter
		function updatePage(pageId, newPage) {
            return $http.put("/api/page/"+pageId, newPage)
                .then(function (response) {
                    return response.data;
                });
		}

		// removes the page from local pages array whose _id matches the pageId parameter
		function deletePage(pageId) {
			return $http.delete("/api/page/"+pageId)
                .then(function (response) {
                    return response.data;
                });
		}
	}
})();