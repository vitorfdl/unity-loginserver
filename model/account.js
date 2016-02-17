"use strict";
const validator = require('validator');

let raw_to_model = (raw) => {
    return {
        "email"   : raw.email,
        "password": raw.password
    };
};
let check_length = function (text, length) {
    if (!text) {
        return false;
    }
    return text.length >= length;
};


module.exports = function (raw) {
    raw = raw || {};

    console.log(raw);
    try {
        raw.email = raw.email.trim().toLowerCase();
    } catch (e) {
       throw 'Invalid email';
    }

    if (!validator.isEmail(String(raw.email)) || typeof raw.email !== 'string') {
        throw 'Invalid email';
    }

    if (!check_length(raw.password, 6) || typeof raw.password !== 'string') {
        throw 'Invalid password, minimum 6 characters';
    }

    return raw_to_model(raw);
};
