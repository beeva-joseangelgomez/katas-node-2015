'use strict';

const util = require("util");
const EventEmitter = require("events");

const SAVED_EVENT = 'saved';
const ERASE_EVENT = 'erase';
var database = {
    users: [
        { name: "Joe Smith",  occupation: "developer"    },
        { name: "Jane Doe",   occupation: "data analyst" },
        { name: "John Henry", occupation: "designer"     }
    ]
};

function User () {
    EventEmitter.call(this);
}

util.inherits(User, EventEmitter);

User.prototype.save = function (obj) {
    database.users.push(obj);
    this.emit(SAVED_EVENT, obj);
};

User.prototype.onSaved = function (callback) {
    this.on(SAVED_EVENT, callback);
};

User.prototype.erase = function (id) {
    if (database.users[id]) {
        database.users.splice(id, 1);
        this.emit(ERASE_EVENT, null, id);
    } else {
        let error = new Error('ID not found');
        this.emit(ERASE_EVENT, error, id);
    }
};

User.prototype.onErase = function (callback) {
    this.on(ERASE_EVENT, callback);
};

User.prototype.all = function () {
    return database.users;
};

module.exports = User;
