'use strict';

const http = require("http");
const url = require('url');
const router = require("./router");

var server = http.createServer((req, res) => {
    let urlParsed = url.parse(req.url);
    router.match(urlParsed.pathname, req, res);
});

server.listen(9000, 'localhost', () => {
   console.log('Listening...');
});
