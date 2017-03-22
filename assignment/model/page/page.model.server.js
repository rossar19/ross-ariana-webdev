module.exports = function () {
    var model = {};
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server.js')();

    var pageModel = mongoose.model('page', pageSchema);

    var api = {
        "setModel": setModel,
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        var deferred = q.defer();

        pageModel.create(page, function(err, p) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function(w) {
                        p._website = w._id;
                        p.save();

                        w.pages.push(p);
                        w.save();
                        deferred.resolve(p);
                    });
            }
        });
        return deferred.promise;
    }
    
    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        
        pageModel.find({_website: websiteId}, function(err, pages) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(pages);
            }
        });
        return deferred.promise;
    }
    
    function findPageById(pageId) {
        var deferred = q.defer();

        pageModel.findById(pageId, function(err, p) {
            if (err || !p) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(p);
            }
        });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();

        pageModel.update({_id: pageId}, {$set: page})
            .then(function(status) {
                    deferred.resolve(status);
            }, function(err) {
                deferred.reject(new Error("Error!!"));
            });
        return deferred.promise;
    }
    
    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.findById(pageId, function(err, p) {
            if(p) {
                model.websiteModel
                    .findWebsiteById(p._website)
                    .then(function(w) {
                        var index = w.pages.indexOf(pageId);
                        w.pages.splice(index, 1);
                        w.save();

                        pageModel.remove({_id: pageId})
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

};