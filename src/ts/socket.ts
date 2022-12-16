import { io } from "socket.io-client";
import {showAvailableOpponent} from "./func"

class Socket {
    isActive = false;
    isSocket = false;
    place = ""; // (home ou away)
    myName = "herydj";
    _currentRoom = "";
    _socket = io();



    init(tableGame: TableGame, circle: Point, croix: Point, socket: any) {
        this.emitStartGame();
        this.onReady();
        this.waitingForOpponent();
        this.toActive();
        this.setCurrentPoint(circle, croix);
        this.onDrawPoint(tableGame, circle, croix, socket)
        this.onReset(tableGame, circle, croix)
        this.onContinue(tableGame)
    }

    emitStartGame() {
        this._socket.emit("start game");
    }

    onReady() {
        this._socket.on("ready", (home, away, room) => {
            this._currentRoom = room;
            console.log("ready");
            console.log(`${home} vs ${away} in ${room}`);
        });
    }

    waitingForOpponent() {
        this._socket.on("waiting opponent", (rooms) => {
            console.log("waiting opponent");
            // home
            this.isActive = true;
            this._currentRoom = rooms;
        });

        this._socket.on("new opponent", (listPlayer: player[]) => {
            // enlever l"utilisateur courant (ce n'est pas un adversaire ^_^)
            listPlayer = listPlayer.filter(e => e.id !== this._socket.id)

            let ul = showAvailableOpponent(listPlayer);
            ul.onclick = (e: MouseEvent) => {
                let target = e.target as HTMLLIElement,
                    [idRoom, idAway] = target.id.split(";"),
                    room = `room${idRoom}`;
                
                this._socket.emit("to ready", room, this._socket.id, idAway)
            } 
        })
    }

    setCurrentPoint(circle: Point, croix: Point) {
        let currentPlayerHTML = document.querySelector(
            ".current-player"
        ) as HTMLElement;
        this._socket.on("home", () => {
            console.log("home");
            this.place = "home";
            currentPlayerHTML.innerHTML = circle.pointHTML;
        });

        this._socket.on("away", () => {
            console.log("away");
            this.place = "away";
            currentPlayerHTML.innerHTML = croix.pointHTML;
        });
    }

    emitPoint(x: number, y: number) {
        this._socket.emit("set point", x, y, this._currentRoom);
    }

    onDrawPoint(
        tableGame: TableGame,
        circle: Point,
        croix: Point,
        socket: any
    ) {
        this._socket.on("draw point", (x: number, y: number) => {
            tableGame.drawPoint(x, y);
            tableGame.pushCoords(x, y);
            tableGame.isWinning = tableGame.checkWinner();
            // changement de joueur et verifier s'il a gagné
            tableGame.permutation(circle, croix, socket);
        });
    }

    toActive() {
        this._socket.on("to active", () => {
            // permutation (mettre l'autre joueur active)
            if (this.isActive) {
                this.isActive = false;
                return;
            }
            this.isActive = true;
        });
    }

    emitReset() {
        this._socket.emit("to reset", this._currentRoom);
    }

    onReset(tableGame: TableGame, circle: Point, croix: Point) {
        this._socket.on("reset", () => {
            tableGame.reset(circle, croix);
            if(this.place === "home") {
                this.isActive = true
                return
            }
            this.isActive = false
        });
    }

    emitContinue() {
        this._socket.emit("to continue", this._currentRoom);
    }

    onContinue(tableGame: TableGame) {
        this._socket.on("continue", () => {
            tableGame.continue();
        });
    }
}

export default Socket;
