'use strict';

const User = require("./User");
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
var app = express();

var server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(compression());

app.use((req, res, next) => {
    console.log('Request recibed to [' + req.method + '] ' + req.originalUrl);
    next();
});

app.get('/users', (req, res) => {
    let user = new User();
    let code, info;
    user.onReaded((error, users) => {
        if (error) {
            code = 500;
            info = error;
        } else {
            code = 200;
            info = 'Success';
        }
        res.status(code).json({
            result: {
                code: code,
                info: info
            },
            data: {
                users: users
            }
        });
    });
    user.all();
});

app.delete('/users/:id', (req, res) => {
    let user = new User();
    user.onErase((id) => {
        res.send({
            result: {
                code: 200,
                info: 'Success'
            }
        });
    });
    user.erase(req.params.id);
});

app.post('/users', (req, res) => {
    let user = new User();
    user.onSaved((error, user) => {
        var code, info;
        if (error) {
            code = 500;
            info = error;
            console.log("not saved: " + error);
        } else {
            code = 200;
            info = 'Success';
            console.log("saved: " + user.name);
        }
        res.status(code).json({
            result: {
                code: code,
                info: info
            }
        });
    });
    user.save(req.body);
});

let port = 9000;
server.listen(port, 'localhost', () => {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});