import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

interface player {
    id: string;
    idOpponent: string | undefined;
    room: string;
    socket: any;
    isAvailable: boolean
}

let app = express();
let httpServer = http.createServer(app);
let io = new Server(httpServer);
const port = process.env.Port || 3000;

app.set("view engine", "ejs");
app.set("views", "dist");
app.use(express.static("dist"));

app.get("/", (request, response) => {
    response.render("./index");
});

let numberPlayer = 0,
    currentRoom = 1;

let listPlayer: player[] = [];

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("start game", (name) => {
        // pousser le player
        listPlayer.push({
            id: socket.id,
            idOpponent: undefined,
            room: `room${currentRoom}`,
            socket,
            isAvailable: true
        });
        // console.log("listPlayer");
        // console.log(listPlayer);
        
        // trier afin d'optimiser le rercheche au living room (dans "to ready")
        listPlayer.sort((a, b) => (a.id as any) - (b.id as any));
        // le socket courant rejoint un "room" et dans la liste qui attend des adversaires
        socket.join("wait opponent");
        socket.join(`room${currentRoom}`);
    
        socket.emit("home");
        socket.emit("waiting opponent", `rooms${currentRoom}`);
    
        // emettre la liste des adversaires disponible
        emitNewOpponent()

        socket.on("to ready", (room: string, idHome: string, idAway: string) => {
            // faire rejoindre l' clické dans le "room"  
            socket.join(room)
            // leave the socket from "wait opponent"
            listPlayer.forEach((e) => {
                
                if (e.id === idHome) {
                    e.socket.leave("wait opponent");
                    // changer le "room" et n"est plus disponible pour un autre adversaire
                    e.room = room
                    e.idOpponent = idAway
                    e.isAvailable = false
                    // mettre a jour les nouveaux adversaire possible
                    emitNewOpponent()
                }
                if (e.id === idAway) {
                    e.socket.leave("wait opponent");      
                    e.socket.emit("away")
                    e.idOpponent = idHome
                    e.isAvailable = false
                    // mettre a jour les nouveaux adversaire possible
                    emitNewOpponent()
                }
            });
            io.in(room).emit("ready", idHome, idAway, room);
        });
        currentRoom++;
    });

    socket.on("set point", (x: number, y: number, room: string) => {
        // emmettre à l'adversaire que c'est son tour
        socket.broadcast.in(room).emit("to active");
        io.in(room).emit("draw point", x, y);
    });

    socket.on("to reset", (room: string) => {
        io.in(room).emit("reset");
    });

    socket.on("to continue", (room: string) => {
        io.in(room).emit("continue");
    });

    socket.on("disconnect", (reason) => {
        console.log("user disconnected " + reason);
        
        if (numberPlayer > 0) return numberPlayer--;
        
        listPlayer.forEach(e => {
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
                io.in(e.room).emit("waiting opponent")
                // mettre a jour les nouveaux adversaire possible 
                emitNewOpponent()
            }
        })
        // remove the player disconnected 
        listPlayer = listPlayer.filter(e => e.id !== socket.id)  
        emitNewOpponent()
    });
});

httpServer.listen(port, () => {
    console.log(`listening at port ${port}`);
});

function emitNewOpponent() {
    // emettre dans le "room : wait opponent" qu'il y a un nouveau adversaire
    // ne retourner que l'id et le "room" car on n'a pas besoin de "socket"
    let players: Partial<player>[] = listPlayer.map(e => {
        return {
            id: e.id,
            room: e.room,
            isAvailable: e.isAvailable
        }
    })
    players = players.filter(e => e.isAvailable)
    io.in("wait opponent").emit("new opponent", players);
}
