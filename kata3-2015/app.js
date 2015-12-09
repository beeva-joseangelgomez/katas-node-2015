'use strict';

const http = require("http");
const url = require('url');
const router = require("./router");

var server = http.createServer(function (req, res) {
    let urlParsed = url.parse(req.url);
    router.match(urlParsed.pathname, req, res);
});

server.listen(9000, 'localhost', function () {
   console.log('Listening...');
});
