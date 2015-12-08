'use strict';

const util = require('util');

module.exports = class UserModel {
    constructor() {
        this.name = '';
        this.occupation = '';
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getOccupation() {
        return this.occupation;
    }

    setOccupation(occupation) {
        this.occupation = occupation;
    }

    _prepare() {
        return JSON.stringify({
                name: this.name,
                occupation: this.occupation
            }) + '\n';
    }

    //clearLine(position, callback) {
        //var rl = readline.createInterface({
        //    input: fs.createReadStream(__dirname + '/database.txt'),
        //    output: null,
        //    terminal: false
        //});
        //let stream = fs.createWriteStream(this.file);
        //stream.on('open', function (fd) {
        //    readline.cursorTo(stream, 0, position);
        //    readline.clearLine(stream, 0);
        //    fs.close(fd, function () {
        //        callback(null, position);
        //    });
        //});
    //}
};
