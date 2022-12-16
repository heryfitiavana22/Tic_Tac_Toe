import { io } from "socket.io-client";

class Socket {
    isActive = false;
    isSocket = false;
    private _currentRoom = "";
    private _socket = io();

    init() {
        this.emitStartGame();
        this.onReady();
        this.waitingForOpponent();
        this.toActive()
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
    }

    setCurrentPoint(tableGame: TableGame, circle: Point, croix: Point) {
        let currentPlayerHTML = document.querySelector(
            ".current-player"
        ) as HTMLElement;
        this._socket.on("home", () => {
            console.log("home");
            // tableGame.currentPlayer = 1
            // tableGame.currentPointHTML = circle.pointHTML;
            currentPlayerHTML.innerHTML = circle.pointHTML;
        });

        this._socket.on("away", () => {
            console.log("away");
            // tableGame.currentPlayer = 2;
            // tableGame.currentPointHTML = croix.pointHTML;
            currentPlayerHTML.innerHTML = croix.pointHTML;
        });
    }

    emitPoint(x: number, y: number) {
        this._socket.emit("set point", x, y, this._currentRoom);
    }

    drawPoint(tableGame: TableGame, circle: Point, croix: Point) {
        this._socket.on("draw point", (x: number, y: number) => {
            tableGame.drawPoint(x, y);
            tableGame.pushCoords(x, y);
            tableGame.isWinning = tableGame.checkWinner();
            // changement de joueur et verifier s'il a gagné
            tableGame.permutation(circle, croix);
        });
    }
    
    toActive() {
        this._socket.on("to active", () => {

            console.log("to active");
            
            // permutation (mettre l'autre joueur active)
            if(this.isActive) {
                this.isActive = false
                return
            }
            this.isActive = true
        })
    }
}

export default Socket;
