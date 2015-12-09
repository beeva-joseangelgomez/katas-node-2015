'use strict';

const User = require("../User");


module.exports = {

    'GET': function (req, res) {
        let user = new User();
        user.all(res);
    },
    'POST': function (req, res) {
        let user = new User();
        user.onSaved(function (error, user) {
            var body, code, info;
            if (error) {
                code = 500;
                info = http.statusCode[500] + ': ' + error;
                console.log("not saved: " + error);
            } else {
                code = 200;
                info = http.statusCode[200];
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
            res.write(body, function () {
                res.end();
            });
            res.on('error', function (error) {
                console.log(error);
            });
        });
        let data = '';
        req.on('data', function (chunk) {
            data += chunk;
            console.log("data: " + data);
        });

        req.on('end', function () {
            user.save(JSON.parse(data));
        });
    },
    'DELETE': function (req, res) {

    }

};