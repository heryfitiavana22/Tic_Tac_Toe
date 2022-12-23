import { io } from "socket.io-client";
import TableGame from "./tableGame";
import { showAvailableOpponent, waitingForOpponent, setMessage } from "../func";

class Socket {
    private _isActive = false;
    private _isSocket = true;
    private _place = ""; // (home ou away)
    private _myName = "herydj";
    private _currentRoom = "";
    private _socket = io();
    private _tableGame: TableGame;
    private _container = document.querySelector(".container  > div") as HTMLDivElement;

    constructor(circle: Point, croix: Point) {
        this._tableGame = new TableGame(3,3)
        this.emitStartGame();
        this.onReady();
        this.waitingForOpponent();
        this.toActive();
        this.setCurrentPoint(circle, croix);
        this.onDrawPoint(circle, croix);
        this.onReset(circle, croix);
        this.onContinue();
    }

    emitStartGame() {
        this._socket.emit("start game");
    }

    onReady() {
        this._socket.on("ready", (home, away, room) => {
            this._currentRoom = room;
            // console.log("ready");
            // console.log(`${home} vs ${away} in ${room}`);
            this._tableGame.init();
        });
    }

    waitingForOpponent() {
        this._socket.on("waiting opponent", (rooms) => {
            // console.log("wait oppo")
            // console.log("waiting opponent");
            waitingForOpponent()
            // home (admettons)
            this._isActive = true;
            this._currentRoom = rooms;
        });

        this._socket.on("new opponent", (listPlayer: player[]) => {
            // console.log("new oppo");
            // enlever l"utilisateur courant (ce n'est pas un adversaire ^_^)
            listPlayer = listPlayer.filter((e) => e.id !== this._socket.id);

            let ul = showAvailableOpponent(listPlayer);
            ul.onclick = (e: MouseEvent) => {
                let target = e.target as HTMLLIElement,
                    [idAway, idRoom] = target.id.split(";"),
                    room = `room${idRoom}`,
                    animation = document.querySelector(
                        ".animation"
                    ) as HTMLDivElement;

                this._socket.emit("to ready", room, this._socket.id, idAway);
                // changer le "room" par le "room" de l'adversaire
                this._currentRoom = `room${idRoom}`;
                animation.classList.remove("loading");
                // activé le "click" au container
            };
            this.onClickCase()
        });
    }

    setCurrentPoint(circle: Point, croix: Point) {
        let currentPlayerHTML = document.querySelector(".current-player") as HTMLElement;

        this._socket.on("home", () => {
            // console.log("home");
            this._place = "home";
            this._isActive = true;
            currentPlayerHTML.innerHTML = circle.pointHTML;
        });

        this._socket.on("away", () => {
            // console.log("away");
            this._place = "away";
            this._isActive = false;
            currentPlayerHTML.innerHTML = croix.pointHTML;
        });
    }

    onClickCase() {
        this._container.onclick = (e: MouseEvent) => {
            let target = e.target as HTMLDivElement,
                coords = target.id.split(";"),
                x = Number(coords[0]),
                y = Number(coords[1]);
            
            // et si on est autorisé de clické (si en ligne)
            if(!this._isActive) return setMessage("C'est le tour de votre adversaire")
            
            // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
            if (
                coords.length !== 2 ||
                target.innerHTML.length > 0 ||
                this._tableGame.getIsWinning
            )
                return;
                
            // on draw point        
            this.emitPoint(x, y)
            // mettre le joueur qui a clické en "non active" (tour de l'adversaire)
            this._isActive = false;
        }; 
    }

    emitPoint(x: number, y: number) {
        this._socket.emit("set point", x, y, this._currentRoom);
    }

    onDrawPoint(
        circle: Point,
        croix: Point,
    ) {
        this._socket.on("draw point", (x: number, y: number) => {
            this._tableGame.drawPoint(x, y);
            this._tableGame.pushCoords(x, y);
            this._tableGame.setIsWinning = this._tableGame.checkWinner();;
            // changement de joueur et verifier s'il a gagné
            this.permutation(circle, croix);
        });
    }

    toActive() {
        this._socket.on("to active", () => {
            console.log("to active");
            
            this._isActive = true;
        });
    }

    emitReset() {
        this._socket.emit("to reset", this._currentRoom);
    }

    onReset(circle: Point, croix: Point) {
        this._socket.on("reset", () => {
            this._tableGame.reset(circle, croix);
            if (this._place === "home") {
                this._isActive = true;
                return;
            }
            this._isActive = false;
        });
    }

    emitContinue() {
        this._socket.emit("to continue", this._currentRoom);
    }

    onContinue() {
        this._socket.on("continue", () => {
            this._tableGame.continue();
        });
    }

    permutation(circle: Point, croix: Point) {
        // player 1 : circle; player 2: croix
        // change _currentPlayer and _currentPointHTML
        if (this._tableGame.getCurrentPlayer === 1) {
            this._tableGame.setCurrentPlayer = 2;
            this._tableGame.setCurrentPointHTML = croix.pointHTML;
            this._tableGame.setCurrentPlayerHTML = croix.pointHTML;
            // si gagnant
            if (this._tableGame.getIsWinning) {
                circle.win();
                this.btnResult(circle, croix);
            }
        } else {
            this._tableGame.setCurrentPlayer = 1;
            this._tableGame.setCurrentPointHTML = circle.pointHTML;
            this._tableGame.setCurrentPlayerHTML = circle.pointHTML;
            // si gagnant
            if (this._tableGame.getIsWinning) {
                croix.win();
                this.btnResult(circle, croix);
            }
        }
    }

    btnResult(circle: Point, croix: Point) {
        let btnReset = document.querySelector("button.reset") as HTMLButtonElement,
            btnContinue = document.querySelector("button.continue") as HTMLButtonElement;

        btnReset.onclick = () => {
            // seul "home" qui peut clické sur "reset" ou "continue" (si en ligne)
            if (this._place === "away") return setMessage("c'est votre adversaire qui peut clické")
            // si en ligne et "home" a clické
            if(this._place === "home") return this.emitContinue()

            this._tableGame.reset(circle, croix);
        };

        btnContinue.onclick = () => {
            // seul "home" qui peut clické sur "reset" ou "continue" (si en ligne)
            if (this._place === "away") return setMessage("c'est votre adversaire qui peut clické")
            // si en ligne et "home" a clické
            if(this._place === "home") return this.emitContinue()

            this._tableGame.continue();
        };
    }
}

export default Socket;
