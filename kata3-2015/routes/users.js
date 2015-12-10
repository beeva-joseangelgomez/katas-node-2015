'use strict';

const http = require("http");
const User = require("../User");


module.exports = {

    'GET': (req, res) => {
        let user = new User();
        user.all(res);
    },
    'POST': (req, res) => {
        let user = new User();
        user.onSaved((error, user) => {
            var body, code, info;
            if (error) {
                code = 500;
                info = http.STATUS_CODES[500] + ': ' + error;
                console.log("not saved: " + error);
            } else {
                code = 200;
                info = http.STATUS_CODES[200];
                console.log("saved: " + user.name);
            }
            body = JSON.stringify({
                result: {
                    code: code,
                    info: info
                }
            });
            res.writeHead(code, {
                'Content-Length': body.length,
                'Content-Type': 'application/json'
            });
            res.write(body, () => res.end());
            res.on('error', error => console.log(error));
        });

        let data = '';
        req.on('data', chunk => data += chunk);

        req.on('end', () => user.save(JSON.parse(data)));
    },
    'DELETE': (req, res) => {

    }

};