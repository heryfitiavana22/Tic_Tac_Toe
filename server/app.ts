import * as path from "path";
import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

let app = express();
let httpServer = http.createServer(app);
let io = new Server(httpServer);

app.set("view engine", "ejs")
app.set("views", "dist")
app.use(express.static("dist"))

app.get("/", (request, response) => {
    response.render("./index")
});

io.on("connection", (socket) => {
    console.log("user connected");

    io.on("disconnect", (reason) => {
        console.log("user disconnected");
    });
});

httpServer.listen(3000, () => {
    console.log("listening at port 3000");
});
