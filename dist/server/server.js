"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var httpServer = http.createServer(app);
var io = new socket_io_1.Server(httpServer);
app.set("view engine", "ejs");
app.set("views", "dist");
app.use(express.static("dist"));
app.get("/", function (request, response) {
    response.render("./index");
});
var numberPlayer = 0, port = process.env.Port || 3000, currentRoom = 1;
var listPlayer = [];
io.on("connection", function (socket) {
    console.log("user connected");
    socket.on("start game", function (name) {
        // pousser le player
        listPlayer.push({
            id: socket.id,
            idOpponent: undefined,
            room: "room".concat(currentRoom),
            socket: socket,
            isAvailable: true
        });
        // console.log("listPlayer");
        // console.log(listPlayer);
        // trier afin d'optimiser le rercheche au living room (dans "to ready")
        listPlayer.sort(function (a, b) { return a.id - b.id; });
        // le socket courant rejoint un "room" et dans la liste qui attend des adversaires
        socket.join("wait opponent");
        socket.join("room".concat(currentRoom));
        socket.emit("home");
        socket.emit("waiting opponent", "rooms".concat(currentRoom));
        // emettre la liste des adversaires disponible
        emitNewOpponent();
        socket.on("to ready", function (room, idHome, idAway) {
            // faire rejoindre l' clické dans le "room"  
            socket.join(room);
            // leave the socket from "wait opponent"
            listPlayer.forEach(function (e) {
                if (e.id === idHome) {
                    e.socket.leave("wait opponent");
                    // changer le "room" et n"est plus disponible pour un autre adversaire
                    e.room = room;
                    e.idOpponent = idAway;
                    e.isAvailable = false;
                    // mettre a jour les nouveaux adversaire possible
                    emitNewOpponent();
                }
                if (e.id === idAway) {
                    e.socket.leave("wait opponent");
                    e.socket.emit("away");
                    e.idOpponent = idHome;
                    e.isAvailable = false;
                    // mettre a jour les nouveaux adversaire possible
                    emitNewOpponent();
                }
            });
            io.in(room).emit("ready", idHome, idAway, room);
        });
        currentRoom++;
    });
    socket.on("set point", function (x, y, room) {
        io.in(room).emit("to active");
        io.in(room).emit("draw point", x, y);
    });
    socket.on("to reset", function (room) {
        io.in(room).emit("reset");
    });
    socket.on("to continue", function (room) {
        io.in(room).emit("continue");
    });
    socket.on("disconnect", function (reason) {
        console.log("user disconnected " + reason);
        if (numberPlayer > 0)
            return numberPlayer--;
        listPlayer.forEach(function (e) {
            // chercher le joueur qui a deconnecté
            if (e.id === socket.id) {
                e.isAvailable = false;
                socket.leave(e.room);
            }
            // chercher l'adversaire du joueur qui a deconncté    
            if (e.idOpponent === socket.id) {
                e.idOpponent = undefined;
                // disponible pour un autre adversaire
                e.isAvailable = true;
                e.socket.join("wait opponent");
                // supposons qu'il sera "home"
                e.socket.join("home");
                e.socket.emit("home");
                e.socket.leave("away");
                io.in(e.room).emit("waiting opponent");
                // mettre a jour les nouveaux adversaire possible 
                emitNewOpponent();
            }
        });
        // remove the player disconnected 
        listPlayer = listPlayer.filter(function (e) { return e.id !== socket.id; });
    });
});
httpServer.listen(port, function () {
    console.log("listening at port ".concat(port));
});
function emitNewOpponent() {
    // emettre dans le "room : wait opponent" qu'il y a un nouveau adversaire
    // ne retourner que l'id et le "room" car on n'a pas besoin de "socket"
    var players = listPlayer.map(function (e) {
        return {
            id: e.id,
            room: e.room,
            isAvailable: e.isAvailable
        };
    });
    players = players.filter(function (e) { return e.isAvailable; });
    io.in("wait opponent").emit("new opponent", players);
}
