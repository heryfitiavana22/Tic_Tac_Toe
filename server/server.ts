import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

interface player {
    id: string;
    room: string;
    socket: any;
}

let app = express();
let httpServer = http.createServer(app);
let io = new Server(httpServer);

app.set("view engine", "ejs");
app.set("views", "dist");
app.use(express.static("dist"));

app.get("/", (request, response) => {
    response.render("./index");
});

let numberPlayer = 0,
    lastId: string,
    currentRoom = 1;

let listPlayer: player[] = [];

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("start game", (name) => {
        // au cas où mitovy
        if (lastId === socket.id) return;
        // pousser le player
        listPlayer.push({
            id: socket.id,
            room: `room${currentRoom}`,
            socket,
        });
        // trier afin d'optimiser le rercheche au living room (dans "to ready")
        listPlayer.sort((a, b) => (a.id as any) - (b.id as any));
        // le socket courant rejoint un "room" et dans la liste qui attend des adversaires
        socket.join("wait opponent");
        socket.join(`room${currentRoom}`);
    
        socket.emit("home");
        socket.emit("waiting opponent", `rooms${currentRoom}`);
    
        // emettre dans le "room" qu'il y a un nouveau adversaire
        // l'envoyeur ne reçoit pas cette émission (à l'aide de "broadcast")
        // ne retourner que l'id et le "room" car on n'a pas besoin de "socket"
        let players: Partial<player>[] = listPlayer.map(e => {
            return {
                id: e.id,
                room: e.room
            }
        })
        io.in("wait opponent").emit("new opponent", players);

        io.on("to ready", (room: string, idHome: string, idAway: string) => {
            console.log(8);
            socket.join(room);
            socket.emit("away")
            // leave the socket from "wait opponent"
            listPlayer.forEach((e) => {
                if (e.id === idHome) {
                    e.socket.leave("wait opponent");
                    // tàf : à exclure le joueur dans la liste
                    e.id = "";
                    return;
                }
                if (e.id === idAway) {
                    e.socket.leave("wait opponent");
                    // tàf : à exclure le joueur dans la liste
                    e.id = "";
                    return;
                }
            });
            io.in(room).emit("ready", idHome, idAway, room);
        });
        lastId = socket.id;

        // numberPlayer++;
        // if (numberPlayer % 2 === 0) {
        //     // le socket courant rejoint le "roomX" (room1, room2)
        //     socket.join(`rooms${currentRoom}`);
        //     // pret pour le "roomX" (room1, room2)
        //     io.in(`rooms${currentRoom}`).emit(
        //         "ready",
        //         lastId,
        //         socket.id,
        //         `rooms${currentRoom}`
        //     );
        //     socket.emit("away");
        //     currentRoom++;
        //     lastId = socket.id;
        //     return;
        // }
        // // le socket courant rejoint le "room"
        // socket.join(`rooms${currentRoom}`);
        
    });

    socket.on("set point", (x: number, y: number, room: string) => {
        io.in(room).emit("to active");
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
    });
});

httpServer.listen(3000, () => {
    console.log("listening at port 3000");
});
