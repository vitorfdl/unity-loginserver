'use strict';
var url = "";
var mongo = require('mongodb').MongoClient;

function DB () {
    var mongoconf = {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        },
        "poolSize": 10
    }
};
    mongo.connect(url, mongoconf, function (err, db) {
        if (err) { return null; }

        return db;
    });
}
module.exports = DB;
