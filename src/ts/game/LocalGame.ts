import TableGame from "../models/TableGame";

class LocalGame {
    private _tableGame: TableGame;
    private _container = document.querySelector(".container  > div") as HTMLDivElement;
    private _circle: Point
    private _croix: Point

    constructor(tableGame: TableGame, circle: Point, croix: Point) {
        this._circle = circle
        this._croix = croix
        this._tableGame = tableGame
        this._tableGame.init()
        circle.init()
        croix.init()
        this.onClickCase()
    }

    onClickCase() {
        this._container.onclick = (e: MouseEvent) => {
            let target = e.target as HTMLDivElement,
                coords = target.id.split(";"),
                x = Number(coords[0]),
                y = Number(coords[1]);
        
            // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
            // et si on est autorisé de clické (si en ligne)
            if (
                coords.length !== 2 ||
                target.innerHTML.length > 0 ||
                this._tableGame.getIsWinning
            )
                return;
                
            // console.log("not socket");
    
            this._tableGame.drawPoint(x, y);
            this._tableGame.pushCoords(x, y);
            this._tableGame.setIsWinning = this._tableGame.checkWinner();
            // changement de joueur et verifier s'il a gagné
            this.permutation()
        };  
    }

    permutation() {
        // player 1 : circle; player 2: croix
        // change _currentPlayer and _currentPointHTML
        if (this._tableGame.getCurrentPlayer === 1) {
            this._tableGame.setCurrentPlayer = 2;
            this._tableGame.setCurrentPointHTML = this._croix.pointHTML;
            this._tableGame.setCurrentPlayerHTML = this._croix.pointHTML;
            // si gagnant
            if (this._tableGame.getIsWinning) {
                this._circle.win();
                this.btnResult();
            }
        } else {
            this._tableGame.setCurrentPlayer = 1;
            this._tableGame.setCurrentPointHTML = this._circle.pointHTML;
            this._tableGame.setCurrentPlayerHTML = this._circle.pointHTML;
            // si gagnant
            if (this._tableGame.getIsWinning) {
                this._croix.win();
                this.btnResult();
            }
        }
    }

    btnResult() {
        let btnReset = document.querySelector("button.reset") as HTMLButtonElement,
            btnContinue = document.querySelector("button.continue") as HTMLButtonElement;

        btnReset.onclick = () => {
            this._tableGame.reset(this._circle, this._croix);
        };

        btnContinue.onclick = () => {
            this._tableGame.continue();
        };
    }
    
}

export default LocalGame