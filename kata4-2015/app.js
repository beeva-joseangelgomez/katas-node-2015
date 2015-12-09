'use strict';

const express = require('express');
const app = express();
//const router = express.Router();

const User = require("./User");

const fs = require('fs');
const url = require('url');

let routeFile = __dirname + '/database.txt';

const server = app.listen(9000, function () {
    const host = 'localhost';
    const port = server.address().port;

    console.log('Listening at http://%s:%s ...', host, port);
});

app.get('/users', function (req, res) {
    fs.stat(routeFile, (err, stats) => {
        if (err) {
            console.error(err.toString());
        } else {
            if (stats.isFile()) {
                let user = new User();
                user.all(res);
            }
        }
    });
});

app.delete('/users/:name', function (req, res) {
    fs.stat(routeFile, (err, stats) => {
        if (err) {
            console.error(err.toString());
        } else {
            if (stats.isFile()) {
                let user = new User();
                user.erase(req.params.name);
            }
        }
    });
});

app.post('/users', function (req, res) {
    fs.stat(routeFile, (err, stats) => {
        if (err) {
            console.error(err.toString());
        } else {
            if (stats.isFile()) {
                let user = new User();
                user.onSaved(function (error, user) {
                    var body, code, info;
                    if (error) {
                        code = 500;
                        info = error;
                        console.log("not saved: " + error);
                    } else {
                        code = 200;
                        info = 'Success';
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
            }
        }
    });
});

app.use(function (req, res, next) {
    let urlParsed = url.parse(req.url);

    let routePath = urlParsed.pathname + '.js';

    const msg = 'Recurso no disponible... ' + req.url;

    res.send(msg);

    console.log(msg);

    next();
});