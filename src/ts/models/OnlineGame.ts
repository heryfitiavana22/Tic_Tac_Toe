import Socket from "./socket"
import { showAvailableOpponent, waitingForOpponent, setMessage } from "../func";

class OnlineGame extends Socket {
    constructor(circle: Point, croix: Point) {
        super(circle, croix)
        this.onDrawPoint(circle, croix);
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

export default OnlineGame
