module.exports = function () {
    var model = {};
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server.js')();

    var widgetModel = mongoose.model('widget', widgetSchema);

    var api = {
        "setModel": setModel,
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "reorderWidget": reorderWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {
        var deferred = q.defer();

        widgetModel.create(widget, function(err, w) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                model.pageModel
                    .findPageById(pageId)
                    .then(function(p) {
                        w._page = p._id;
                        w.save();

                        p.widgets.push(w);
                        p.save();
                        deferred.resolve(w);
                    });
            }
        });
        return deferred.promise;
    }
    
    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        
        widgetModel.find({_page: pageId}, function(err, widgets) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(widgets);
            }
        });
        return deferred.promise;
    }
    
    function findWidgetById(widgetId) {
        var deferred = q.defer();

        widgetModel.findById(widgetId, function(err, w) {
            if (err || !w) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(w);
            }
        });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();

        widgetModel.update({_id: widgetId}, {$set: widget})
            .then(function(status) {
                    deferred.resolve(status);
            }, function(err) {
                deferred.reject(new Error("Error!!"));
            });
        return deferred.promise;
    }
    
    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.findById(widgetId, function(err, w) {
            if(w) {
                model.pageModel
                    .findPageById(w._page)
                    .then(function(p) {
                        var index = p.widgets.indexOf(widgetId);
                        p.widgets.splice(index, 1);
                        p.save();

                        widgetModel.remove({_id: widgetId})
                            .then(function(status) {
                                deferred.resolve(status);
                            }, function(err) {
                                deferred.reject(new Error("Error!!"));
                            });
                    });
            }
        })
        return deferred.promise;
    }

    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();

        return deferred.promise;
    }

};