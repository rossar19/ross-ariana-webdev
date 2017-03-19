(function() {
	angular
		.module("WebAppMaker")
		.factory("FlickrService", FlickrService);

	function FlickrService($http) {
        var key = "d2a2ff00e29e5504f12888864a8640cb";
        var secret = "b1b5eb5c8f00c6aa";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
		var api = {
            "searchPhotos": searchPhotos
        };
        return api;
        
        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
	}
})();