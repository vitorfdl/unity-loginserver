"use strict";
var connect = require("../mongodb/mongo.js");
var model_create = require("../../model/account.js");
var bcrypt       = require('bcrypt');

module.exports = function (body, callback) {
    let model;
    try {
        model = model_create(body);
    } catch (error) {
        return callback(error);
    }

    connect((error, db) => {
        let query = {
            "email": body.email,
        };

        db.collection("accounts").findOne(query, (error, result) => {
            if (!result) { return callback("Account don't exists"); }
            if (!bcrypt.compareSync(body.password, result.password)) {
                return callback("Wrong Password");
            }
            callback(null, "Logged");
            db.close();
        });
    });
};
