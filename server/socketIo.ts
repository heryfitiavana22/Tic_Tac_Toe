import { Server } from "socket.io";

interface player {
    id: string;
    name: string;
    idOpponent: string | undefined;
    room: string;
    socket: any;
    isAvailable: boolean
}

class SocketIo {
    private _io: Server;
    private _numberPlayer = 0
    private _currentRoom = 1;
    private _listPlayer: player[] = [];
    constructor(httpSever: any) {
        this._io = new Server(httpSever)
    }

    start() {
        this._io.on("connection", (socket) => {
            console.log("user connected");

            socket.on("start game", (name) => {
                console.log("start");
                
                // pousser le player
                this._listPlayer.push({
                    id: socket.id,
                    name,
                    idOpponent: undefined,
                    room: `room${this._currentRoom}`,
                    socket,
                    isAvailable: true
                });
                
                // trier afin d'optimiser le rercheche au living room (dans "to ready")
                this._listPlayer.sort((a, b) => (a.id as any) - (b.id as any));
                // le socket courant rejoint un "room" et dans la liste qui attend des adversaires
                socket.join("wait opponent");
                socket.join(`room${this._currentRoom}`);
            
                socket.emit("home");
                socket.emit("waiting opponent", `rooms${this._currentRoom}`);
            
                // emettre la liste des adversaires disponible
                this.emitNewOpponent()

                socket.on("to ready", (room: string, idHome: string, idAway: string) => {
                    // faire rejoindre l' clické dans le "room"  
                    socket.join(room)
                    // leave the socket from "wait opponent"
                    this._listPlayer.forEach((e) => {
                        
                        if (e.id === idHome) {
                            e.socket.leave("wait opponent");
                            // changer le "room" et n"est plus disponible pour un autre adversaire
                            e.room = room
                            e.idOpponent = idAway
                            e.isAvailable = false
                            // mettre a jour les nouveaux adversaire possible
                            this.emitNewOpponent()
                        }
                        if (e.id === idAway) {
                            e.socket.leave("wait opponent");      
                            e.socket.emit("away")
                            e.idOpponent = idHome
                            e.isAvailable = false
                            // mettre a jour les nouveaux adversaire possible
                            this.emitNewOpponent()
                        }
                    });
                    this._io.in(room).emit("ready", idHome, idAway, room);
                });
                this._currentRoom++;
            });

            socket.on("set point", (x: number, y: number, room: string) => {
                // emmettre à l'adversaire que c'est son tour
                socket.broadcast.in(room).emit("to active");
                this._io.in(room).emit("draw point", x, y);
            });

            socket.on("to reset", (room: string) => {
                this._io.in(room).emit("reset");
            });

            socket.on("to continue", (room: string) => {
                this._io.in(room).emit("continue");
            });

            socket.on("disconnect", (reason) => {
                console.log("user disconnected " + reason);
                
                if (this._numberPlayer > 0) return this._numberPlayer--;
                
                this._listPlayer.forEach(e => {
                    // chercher le joueur qui a deconnecté
                    if (e.id === socket.id) {
                        e.isAvailable = false
                        socket.leave(e.room)
                    }  
                    // chercher l'adversaire du joueur qui a deconncté    
                    if(e.idOpponent === socket.id)  {
                        e.idOpponent = undefined
                        // disponible pour un autre adversaire
                        e.isAvailable = true
                        e.socket.join("wait opponent")
                        // supposons qu'il sera "home"
                        e.socket.join("home")
                        e.socket.emit("home")
                        e.socket.leave("away")
                        this._io.in(e.room).emit("waiting opponent")
                        // mettre a jour les nouveaux adversaire possible 
                        this.emitNewOpponent()
                    }
                })
                // remove the player disconnected 
                this._listPlayer = this._listPlayer.filter(e => e.id !== socket.id)  
                this.emitNewOpponent()
            });
        });
    }

    emitNewOpponent() {
        // emettre dans le "room : wait opponent" qu'il y a un nouveau adversaire
        // ne retourner que l'id et le "room" car on n'a pas besoin de "socket"
        let players: Partial<player>[] = this._listPlayer.map(e => {
            return {
                id: e.id,
                room: e.room,
                isAvailable: e.isAvailable,
                name: e.name
            }
        })
        players = players.filter(e => e.isAvailable)
        this._io.in("wait opponent").emit("new opponent", players);
    }
    
}

export default SocketIo
