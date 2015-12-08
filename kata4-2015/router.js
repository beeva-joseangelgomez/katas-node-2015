'use strict';

const fs = require('fs');
const base = __dirname + '/routes';

module.exports = {

    match: (path, req, res) => {
        let routePath = base + path + '.js';
        fs.stat(routePath, (err, stats) => {
            if (err) {
                console.error(err.toString());
            } else {
                if (stats.isFile()) {
                    let route = require(routePath);
                    route[req.method](req, res);
                }
            }
        });
    }

};