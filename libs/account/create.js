"use strict";
var connect      = require("../mongodb/mongo.js");
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
            if (result) { return callback("Already Exists "); }
            model.password = bcrypt.hashSync(model.password, 10);

            db.collection("accounts").insert(model, (error) => {
                if (error) { return callback("Error Creating Account"); }
                db.close();
                callback();
            });
        });
    });
};
