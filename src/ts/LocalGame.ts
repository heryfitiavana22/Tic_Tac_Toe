import TableGame from "./models/tableGame";

class LocalGame {
    private _tableGame: TableGame;
    private _container = document.querySelector(".container  > div") as HTMLDivElement;

    constructor(circle: Point, croix: Point) {
        this._tableGame = new TableGame(3,3)
        this._tableGame.init()
        this.onClickCase(circle, croix)
    }

    onClickCase(circle: Point, croix: Point) {
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
            this.permutation(circle, croix)
        };  
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
            this._tableGame.reset(circle, croix);
        };

        btnContinue.onclick = () => {
            this._tableGame.continue();
        };
    }
    
}

export default LocalGame