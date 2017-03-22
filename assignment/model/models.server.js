module.exports = function(model) {
	var mongoose = require('mongoose');

	// mongoose.createConnection('mongodb://127.0.0.1:27017/webdev-assignment');
	mongoose.connect('mongodb://127.0.0.1:27017/webdev-assignment');

	var userModel = require ('./user/user.model.server')();
	var websiteModel = require ('./website/website.model.server')();
	// var pageModel = require ('./model/page/page.model.server')();
	// var widgetModel = require ('./model/widget/widget.model.server')();

	var model = {
		userModel: userModel,
		websiteModel: websiteModel
		// pageModel: pageModel,
		// widgetModel: widgetModel
	}
	websiteModel.setModel(model);
	return model;

};