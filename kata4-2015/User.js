'use strict';

const util = require("util");
const fs = require('fs');
const zlib = require("zlib");
const EventEmitter = require("events");
const UserModel = require("./UserModel.js");

const SAVED_EVENT = 'saved';
const ERASE_EVENT = 'erase';
const READED_EVENT = 'readed';
var that;

function User() {
    EventEmitter.call(this);
    that = this;
    this.file = __dirname + '/database.txt';
}

util.inherits(User, EventEmitter);

User.prototype.save = function (obj) {
    let userModel = new UserModel();
    userModel.setName(obj.name);
    userModel.setOccupation(obj.occupation);

    let writable = fs.createWriteStream(this.file, {flags: 'a'});
    writable.on('open', function (fd) {
        writable.write(userModel._prepare(), function () {
            writable.end(function () {
                that.emit(SAVED_EVENT, null, obj);
            });
        });
    });
    writable.on('error', function (error) {
        that.emit(SAVED_EVENT, error, obj);
    });
};

User.prototype.append = function (obj) {
    let userModel = new UserModel();
    userModel.setName(obj.name);
    userModel.setOccupation(obj.occupation);

    fs.appendFile(this.file, userModel._prepare(), function (error) {
        that.emit(SAVED_EVENT, error, obj);
    });
};

User.prototype.onSaved = function (callback) {
    this.on(SAVED_EVENT, callback);
};

User.prototype.erase = function (id) {
    that.emit(ERASE_EVENT, id);
};

User.prototype.onErase = function (callback) {
    this.on(ERASE_EVENT, callback);
};

User.prototype.all = function () {
    var data = [];
    let readable = fs.createReadStream(this.file);
    var readline = require('readline');
    var rl = readline.createInterface({input: readable});
    rl.on('line', function (line) {
        data.push(JSON.parse(line));
    });
    rl.on('close', () => {
        that.emit(READED_EVENT, null, data);
    });
};

User.prototype.onReaded = function (callback) {
    this.on(READED_EVENT, callback);
};

User.prototype.compress = function () {
    let input = fs.createReadStream(this.file);
    let gzip = zlib.createGzip();
    let output = fs.createWriteStream(this.file + '.gz');

    input.pipe(gzip).pipe(output);
};

module.exports = User;
