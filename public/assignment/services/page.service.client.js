(function() {
	angular
		.module("WebAppMaker")
		.factory("PageService", PageService);

	function PageService() {
		var pages = [
			{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
			{ "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
			{ "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
		];

		var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
		}
		return api;

		// retrieves the pages in local pages array whose websiteId matches the parameter websiteId
		function findPagesByWebsiteId(websiteId) {
			var ps = [];
			for (var p in pages) {
				if (websiteId == pages[p].websiteId) {
					ps.push(pages[p]);
				}
			}
			return ps;
		}
		
		// retrieves the page in local pages array whose _id matches the pageId parameter
		function findPageById(pageId) {
			for (var p in pages) {
				if (pageId == pages[p]._id) {
					return angular.copy(pages[p]);
				}
			}
			return null;
		}
		
		// updates the page in local pages array whose _id matches the pageId parameter
		function updatePage(pageId, newPage) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pageId ) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;
                    return page;
                }
            }
            return null;
		}

		// removes the page from local pages array whose _id matches the pageId parameter
		function deletePage(pageId) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pageId ) {
					pages.splice(p, 1);
                    return;
                }
            }
            return null;
		}

        // creates an ID for new users
        function generatePageId() {
        	var temp = Math.floor(Math.random() * 1000);
        	if (findPageById(temp) != null) {
        		generatePageId();
        	}

        	return temp.toString();
        }

		// adds the page parameter instance to the local pages array. The new page's websiteId is set to the websiteId parameter
		function createPage(websiteId, page) {
			var p = {
				"_id": generatePageId(),
				"name": page.name,
				"websiteId": websiteId,
				"description": page.description
			}
			pages.push(p);
		}
	}
})();