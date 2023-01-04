"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var SocketIo = /** @class */ (function () {
    function SocketIo(httpSever) {
        this._numberPlayer = 0;
        this._currentRoom = 1;
        this._listPlayer = [];
        this._io = new socket_io_1.Server(httpSever);
    }
    SocketIo.prototype.start = function () {
        var _this = this;
        this._io.on("connection", function (socket) {
            console.log("user connected");
            socket.on("start game", function (name) {
                console.log("start");
                // pousser le player
                _this._listPlayer.push({
                    id: socket.id,
                    name: name,
                    idOpponent: undefined,
                    room: "room".concat(_this._currentRoom),
                    socket: socket,
                    isAvailable: true
                });
                // trier afin d'optimiser le rercheche (dans "to ready")
                _this._listPlayer.sort(function (a, b) { return a.id - b.id; });
                // le socket courant rejoint un "room" et dans la liste qui attend des adversaires
                socket.join("wait opponent");
                socket.join("room".concat(_this._currentRoom));
                socket.emit("home");
                socket.emit("waiting opponent", "rooms".concat(_this._currentRoom));
                // emettre la liste des adversaires disponible
                _this.emitNewOpponent();
                socket.on("to ready", function (room, home, away) {
                    // faire rejoindre l' clické dans le "room"  
                    socket.join(room);
                    // leave the socket from "wait opponent"
                    _this._listPlayer.forEach(function (e) {
                        if (e.id === home.id) {
                            e.socket.leave("wait opponent");
                            // changer le "room" et n"est plus disponible pour un autre adversaire
                            e.room = room;
                            e.idOpponent = away.id;
                            e.isAvailable = false;
                            // mettre a jour les nouveaux adversaire possible
                            _this.emitNewOpponent();
                        }
                        if (e.id === away.id) {
                            e.socket.leave("wait opponent");
                            e.socket.emit("away");
                            e.idOpponent = home.id;
                            e.isAvailable = false;
                            // mettre a jour les nouveaux adversaire possible
                            _this.emitNewOpponent();
                        }
                    });
                    _this._io.in(room).emit("ready", home.name, away.name, room);
                });
                _this._currentRoom++;
            });
            socket.on("set point", function (x, y, room) {
                // emmettre à l'adversaire que c'est son tour
                socket.broadcast.in(room).emit("to active");
                _this._io.in(room).emit("draw point", x, y);
            });
            socket.on("to reset", function (room) {
                _this._io.in(room).emit("reset");
            });
            socket.on("to continue", function (room) {
                _this._io.in(room).emit("continue");
            });
            socket.on("disconnect", function (reason) {
                console.log("user disconnected " + reason);
                if (_this._numberPlayer > 0)
                    return _this._numberPlayer--;
                _this._listPlayer.forEach(function (e) {
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
                        _this._io.in(e.room).emit("waiting opponent");
                        // mettre a jour les nouveaux adversaire possible 
                        _this.emitNewOpponent();
                    }
                });
                // remove the player disconnected 
                _this._listPlayer = _this._listPlayer.filter(function (e) { return e.id !== socket.id; });
                _this.emitNewOpponent();
            });
        });
    };
    SocketIo.prototype.emitNewOpponent = function () {
        // emettre dans le "room : wait opponent" qu'il y a un nouveau adversaire
        // ne retourner que l'id et le "room" car on n'a pas besoin de "socket"
        var players = this._listPlayer.map(function (e) {
            return {
                id: e.id,
                room: e.room,
                isAvailable: e.isAvailable,
                name: e.name
            };
        });
        players = players.filter(function (e) { return e.isAvailable; });
        this._io.in("wait opponent").emit("new opponent", players);
    };
    return SocketIo;
}());
exports.default = SocketIo;
//# sourceMappingURL=socketIo.js.map