import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

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
    currentId: string,
    currentRoom = 1;

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("start game", (name) => {
        numberPlayer++;
        if (numberPlayer % 2 === 0) {
            // le socket courant rejoint le "roomX" (room1, room2)
            socket.join(`rooms${currentRoom}`);
            // pret pour le "roomX" (room1, room2)
            io.in(`rooms${currentRoom}`).emit(
                "ready",
                currentId,
                socket.id,
                `rooms${currentRoom}`
            );
            socket.emit("away")
            currentRoom++;
            return;
        }
        // le socket courant rejoint le "room"
        socket.join(`rooms${currentRoom}`);
        currentId = socket.id;

        socket.emit("home")
        socket.emit("waiting opponent", `rooms${currentRoom}`);

    });

    socket.on("set point", (x: number, y: number, room: string) => {    
        io.in(room).emit("to active")
        io.in(room).emit("draw point", x, y);
    });


    socket.on("disconnect", (reason) => {
        console.log("user disconnected " + reason);
    });
});

httpServer.listen(3000, () => {
    console.log("listening at port 3000");
});
