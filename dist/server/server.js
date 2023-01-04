"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketIo_1 = require("./socketIo");
var app = express(), httpServer = http.createServer(app), io = new socketIo_1.default(httpServer), port = process.env.Port || 3000;
app.set("view engine", "ejs");
app.set("views", "dist");
app.use(express.static("dist"));
app.get("/", function (request, response) {
    response.render("./index");
});
// start socket.io
io.start();
httpServer.listen(port, function () {
    console.log("listening at port ".concat(port));
});
//# sourceMappingURL=server.js.map