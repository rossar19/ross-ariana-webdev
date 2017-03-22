module.exports = function(model) {
	var mongoose = require('mongoose');
	
	mongoose.connect('mongodb://127.0.0.1:27017/webdev-assignment');

	var userModel = require ('./user/user.model.server')();
	var websiteModel = require ('./website/website.model.server')();
	var pageModel = require ('./page/page.model.server')();
	var widgetModel = require ('./widget/widget.model.server')();

	var model = {
		userModel: userModel,
		websiteModel: websiteModel,
		pageModel: pageModel,
		widgetModel: widgetModel
	}
	websiteModel.setModel(model);
	pageModel.setModel(model);
	widgetModel.setModel(model);
	return model;

};