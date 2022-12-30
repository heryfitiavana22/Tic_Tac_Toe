import { io } from "socket.io-client"

class Socket {
    protected _isActive = false;
    protected _place = ""; // (home ou away)
    protected _myName = "herydj";
    protected _currentRoom = "";
    protected _socket = io();
    protected _container = document.querySelector(".container  > div") as HTMLDivElement;

    constructor(circle: Point, croix: Point) {
        this.emitStartGame();
        this.onWaitingOpponent();
        this.onNewOpponent()
        this.toActive();
        this.setCurrentPoint(circle, croix);
    }

    emitStartGame() {
        this._socket.emit("start game");
    }

    onWaitingOpponent() {
        this._socket.on("waiting opponent", (rooms) => {
            // console.log("wait oppo")
            // console.log("waiting opponent");
            this.waitingForOpponent()
            // home (admettons)
            this._isActive = true;
            this._currentRoom = rooms;
        });
    }

    waitingForOpponent() {
        let container = document.querySelector(".container  > div") as HTMLDivElement;
        container.className = "wait-opponent"
        container.innerHTML =
        `<h2>Available opponent :</h2>
        <ul class="list-opponent">
            
        </ul>
        <div class="animation">
            <div class="bar b1 odd"></div>
            <div class="bar b2 even"></div>
            <div class="bar b3 odd"></div>
            <div class="bar b4 even"></div>
        </div>`
        let animation = document.querySelector(".animation") as HTMLDivElement;
        animation.classList.add("loading")
    }

    onNewOpponent() {
        this._socket.on("new opponent", (listPlayer: player[]) => {
            // console.log("new oppo");
            // enlever l"utilisateur courant (ce n'est pas un adversaire ^_^)
            listPlayer = listPlayer.filter((e) => e.id !== this._socket.id);

            let ul = this.showAvailableOpponent(listPlayer);
            // handle click on opponent
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
            
        });
    }

    showAvailableOpponent(list: player[]): HTMLUListElement {
        let container = document.querySelector(".container  > div") as HTMLDivElement,
            ul = document.querySelector("ul.list-opponent") as HTMLUListElement,
            listHTML = ``;
    
        container.className = "wait-opponent";
        for(let e of list) {
            // ex : room1, room2, ...
            let idRoom = e.room.slice(e.room.indexOf("m")+1)
            listHTML += `<li id="${e.id};${idRoom}">${e.id}</li>`
        }   
    
        ul.innerHTML = listHTML
        return ul
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

    emitPoint(x: number, y: number) {
        this._socket.emit("set point", x, y, this._currentRoom);
    }


    toActive() {
        this._socket.on("to active", () => {
            // console.log("to active");
            this._isActive = true;
        });
    }

    emitReset() {
        this._socket.emit("to reset", this._currentRoom);
    }

    emitContinue() {
        this._socket.emit("to continue", this._currentRoom);
    }   
}

export default Socket;
