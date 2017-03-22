module.exports = function () {
    var model = {};
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server.js')();

    var websiteModel = mongoose.model('Website', websiteSchema);

    var api = {
        "setModel": setModel,
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();

        websiteModel.create(website, function(err, w) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                model.userModel
                    .findUserById(userId)
                    .then(function(u) {
                        w._user = u._id;
                        w.save();

                        u.websites.push(w); //users.populate('websites').exec()
                        u.save();
                        deferred.resolve(w);
                    });
            }
        });
        return deferred.promise;
    }
    
    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        
        websiteModel.find({_user: userId}, function(err, websites) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(websites);
            }
        });
        return deferred.promise;
    }
    
    function findWebsiteById(websiteId) {
        var deferred = q.defer();

        websiteModel.findById(websiteId, function(err, w) {
            if (err || !w) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(w);
            }
        });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();

        websiteModel.update({_id: websiteId}, {$set: website})
            .then(function(status) {
                    deferred.resolve(status);
            }, function(err) {
                deferred.reject(new Error("Error!!"));
            });
        return deferred.promise;
    }
    
    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.findById(websiteId, function(err, w) {
            if(w) {
                model.userModel
                    .findUserById(w._user)
                    .then(function(u) {
                        var index = u.websites.indexOf(websiteId);
                        u.websites.splice(index, 1);
                        u.save();

                        websiteModel.remove({_id: websiteId})
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