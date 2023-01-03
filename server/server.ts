import * as express from "express";
import * as http from "http";
import SocketIo from "./socketIo"
import * as session from "express-session"

let app = express(),
    httpServer = http.createServer(app),
    io = new SocketIo(httpServer),
    port = process.env.Port || 3000;

app.set("view engine", "ejs");
app.set("views", "dist");
app.use(express.static("dist"));

app.get("/", (request, response) => {
    response.render("./index");
});

// start socket.io
io.start()

httpServer.listen(port, () => {
    console.log(`listening at port ${port}`);
});
