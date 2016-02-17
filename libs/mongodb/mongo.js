'use strict';
var url = "mongodb://localhost/gameserver";
var mongo = require('mongodb').MongoClient;

module.exports = function(callback) {
    let mongoconf = {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        },
        "poolSize": 10
    }
};
    mongo.connect(url, mongoconf, function (err, db) {
        if (err) { return callback(err); }
        return callback(null, db);
    });
};
