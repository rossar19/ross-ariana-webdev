module.exports = function () {
    var mongoose = require('mongoose');
    var pageSchema = mongoose.Schema({	
		_website: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
		name: String,
		title: String,
		description: String,
		widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}],
		dateCreated: {type: Date, default: Date.now}
    }, {collection: 'pages'});

    return pageSchema;
};