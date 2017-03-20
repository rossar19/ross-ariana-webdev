// does the same thing as an iffy function on the server side
module.exports = function(app) {
	var userModel = require ('./model/user/user.model.server')();
	// var websiteModel = require ('./model/website/website.model.server')();
	// var pageModel = require ('./model/page/page.model.server')();
	// var widgetModel = require ('./model/widget/widget.model.server')();

	var model = {
		userModel: userModel
		// websiteModel: websiteModel,
		// pageModel: pageModel,
		// widgetModel: widgetModel
	}

    require ("./services/user.service.server.js")(app, model);
    require ("./services/website.service.server.js")(app);
    require ("./services/page.service.server.js")(app);
    require ("./services/widget.service.server.js")(app);
};