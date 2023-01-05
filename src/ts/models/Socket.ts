import { io } from "socket.io-client"
import User from "../user/User";

class Socket {
    protected _isActive = false;
    protected _socket = io();
    protected _user = new User();
    protected _container = document.querySelector(".container  > div") as HTMLDivElement;

    constructor() {
        this.emitStartGame();
        this.onWaitingOpponent();
        this.onNewOpponent()
        this.toActive();
        this.setPlace();
    }

    emitStartGame() {   
        this._user.getUSer()
        this._socket.emit("start game", this._user.name);
    }

    onWaitingOpponent() {
        this._socket.on("waiting opponent", (rooms) => {
            this.waitingForOpponent()
            // home (admettons)
            this._isActive = true;
            this._user.currentRoom = rooms
        });
    }

    waitingForOpponent() {
        let container = document.querySelector(".container  > div") as HTMLDivElement;
        container.className = "wait-opponent"
        container.innerHTML =`
            <h2>Available opponent :</h2>
            <ul class="list-opponent">
                
            </ul>
            <div class="animation">
                <div class="bar b1 odd"></div>
                <div class="bar b2 even"></div>
                <div class="bar b3 odd"></div>
                <div class="bar b4 even"></div>
            </div>
        `;
        let animation = document.querySelector(".animation") as HTMLDivElement;
        animation.classList.add("loading")
        // eviter un bug
        let resultHTML = document.querySelector(".result") as HTMLDivElement,
            playerContainer = document.querySelector(".players") as HTMLElement;
        resultHTML.style.transform = "scale(0)";
        resultHTML.innerHTML = ""
        playerContainer.innerHTML = ""        
    }

    onNewOpponent() {
        this._socket.on("new opponent", (listPlayer: player[]) => {
            // enlever l"utilisateur courant (ce n'est pas un adversaire ^_^)
            listPlayer = listPlayer.filter((e) => e.id !== this._socket.id);

            let ul = this.showAvailableOpponent(listPlayer);
            // handle click on opponent
            ul.onclick = (e: MouseEvent) => {
                let target = e.target as HTMLLIElement,
                    nameOpponent = target.innerHTML,
                    [idAway, idRoom] = target.id.split(";"),
                    room = `room${idRoom}`,
                    animation = document.querySelector(".animation") as HTMLDivElement;

                let home = {
                        name: this._user.name,
                        id: this._socket.id
                    },
                    away = {
                        name: nameOpponent,
                        id: idAway
                    };

                this._socket.emit("to ready", room, home, away);
                // changer le "room" par le "room" de l'adversaire
                this._user.currentRoom = `room${idRoom}`;
                this._user.nameOpponent = nameOpponent
                animation.classList.remove("loading");
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
            listHTML += `<li id="${e.id};${idRoom}">${e.name}</li>`
        }   
    
        ul.innerHTML = listHTML
        return ul
    }

    setPlace() {
        this._socket.on("home", () => {
            // console.log("home");
            this._user.place = "home";
            this._isActive = true;
        });

        this._socket.on("away", () => {
            // console.log("away");
            this._user.place = "away";
            this._isActive = false;
        });
    }

    emitPoint(x: number, y: number) {
        this._socket.emit("set point", x, y, this._user.currentRoom);
    }


    toActive() {
        this._socket.on("to active", () => {
            // console.log("to active");
            this._isActive = true;
        });
    }

    emitReset() {
        this._socket.emit("to reset", this._user.currentRoom);
    }

    emitContinue() {
        this._socket.emit("to continue", this._user.currentRoom);
    }   
}

export default Socket;
