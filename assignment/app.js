// does the same thing as an iffy function on the server side
module.exports = function(app) {
	var model = require('./model/models.server.js')();

    require ("./services/user.service.server.js")(app, model);
    require ("./services/website.service.server.js")(app, model);
    require ("./services/page.service.server.js")(app);
    require ("./services/widget.service.server.js")(app);
};