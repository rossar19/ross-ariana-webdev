(function() {
  angular
    .module("WebAppMaker")
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
		.when("/", {
			templateUrl: 'views/User/template/login.view.client.html',
			controller: "loginController",
			controllerAs: "logModel"
		})
		.when("default", {
			templateUrl: 'views/User/template/login.view.client.html',
			controller: "loginController",
			controllerAs: "logModel"
		})
		.when("/login", {
			templateUrl: 'views/User/template/login.view.client.html',
			controller: "loginController",
			controllerAs: "logModel"
		})
		.when("/register", {
			templateUrl: 'views/User/template/register.view.client.html',
			controller: "registerController",
			controllerAs: "regModel"
		})
		.when("/user/:uid", {
			templateUrl: 'views/User/template/profile.view.client.html',
			controller: "profileController",
			controllerAs: "proModel"
		})
		.when("/user/:uid/website", {
			templateUrl: 'views/Website/template/website-list.view.client.html',
			controller: "websiteListController",
			controllerAs: "wListModel"
		})
		.when("/user/:uid/website/new", {
			templateUrl: 'views/Website/template/website-new.view.client.html',
			controller: "newWebsiteController",
			controllerAs: "wNewModel"
		})
		.when("/user/:uid/website/:wid", {
			templateUrl: 'views/Website/template/website-edit.view.client.html',
			controller: "editWebsiteController",
			controllerAs: "wEditModel"
		})
		.when("/user/:uid/website/:wid/page", {
			templateUrl: 'views/Page/template/page-list.view.client.html',
			controller: "pageListController",
			controllerAs: "pListModel"
		})
		.when("/user/:uid/website/:wid/page/new", {
			templateUrl: 'views/Page/template/page-new.view.client.html',
			controller: "newPageController",
			controllerAs: "pNewModel"
		})
		.when("/user/:uid/website/:wid/page/:pid", {
			templateUrl: 'views/Page/template/page-edit.view.client.html',
			controller: "editPageController",
			controllerAs: "pEditModel"
		})
		.when("/user/:uid/website/:wid/page/:pid/widget", {
			templateUrl: 'views/Widget/template/widget-list.view.client.html',
			controller: "widgetListController",
			controllerAs: "wgListModel"
		})
		.when("/user/:uid/website/:wid/page/:pid/widget/new", {
			templateUrl: 'views/Widget/template/widget-choose.view.client.html',
			controller: "newWidgetController",
			controllerAs: "wgNewModel"
		})
		.when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
			templateUrl: 'views/Widget/template/widget-edit.view.client.html',
			controller: "editWidgetController",
			controllerAs: "wgEditModel"
		})
	}
})();