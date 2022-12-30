import Socket from "./models/socket"
import TableGame from "./models/tableGame";

class OnlineGame extends Socket {
    protected _tableGame: TableGame;
    constructor(circle: Point, croix: Point) {
        super(circle, croix)
        this._tableGame = new TableGame(3,3)
        this.onDrawPoint(circle, croix);
        this.onClickCase()
        this.onReady();
        this.onReset(circle, croix);
        this.onContinue();
        this.waitingForOpponent()
    }

    onReady() {
        this._socket.on("ready", (home, away, room) => {
            this._currentRoom = room;
            // console.log("ready");
            // console.log(`${home} vs ${away} in ${room}`);
            this._tableGame.init();
        });
    }

    onClickCase() {
        this._container.onclick = (e: MouseEvent) => {
            let target = e.target as HTMLDivElement,
                coords = target.id.split(";"),
                x = Number(coords[0]),
                y = Number(coords[1]);
            
            // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
            if (
                coords.length !== 2 ||
                target.innerHTML.length > 0 ||
                this._tableGame.getIsWinning
            )
                return;

            // et si on est autorisé de clické (si en ligne)
            if(!this._isActive) return this.setMessage("C'est le tour de votre adversaire")
            
                
            // on draw point        
            this.emitPoint(x, y)
            // mettre le joueur qui a clické en "non active" (tour de l'adversaire)
            this._isActive = false;
        }; 
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
            if (this._place === "away") return this.setMessage("c'est votre adversaire qui peut clické")
            // si en ligne et "home" a clické
            if(this._place === "home") return this.emitContinue()

            this._tableGame.reset(circle, croix);
        };

        btnContinue.onclick = () => {
            // seul "home" qui peut clické sur "reset" ou "continue" (si en ligne)
            if (this._place === "away") return this.setMessage("c'est votre adversaire qui peut clické")
            // si en ligne et "home" a clické
            if(this._place === "home") return this.emitContinue()

            this._tableGame.continue();
        };
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

    onContinue() {
        this._socket.on("continue", () => {
            this._tableGame.continue();
        });
    }

    setMessage(message: string) {
        let messageHTML = document.querySelector(".message") as HTMLParagraphElement
        messageHTML.innerHTML = message
        messageHTML.style.opacity = "1"
        setTimeout(() => {
            messageHTML.style.opacity = "0"
            messageHTML.innerHTML = ""
        }, 1000)
    }
}

export default OnlineGame
