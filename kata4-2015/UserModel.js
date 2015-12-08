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
};
