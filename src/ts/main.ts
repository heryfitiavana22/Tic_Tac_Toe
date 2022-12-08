import "../css/style.css";
import TableGame from "./tableGame";
import Point from "./point";

(() => {
    let tableGame = new TableGame(3, 3),
        circle: Point = new Point('player1', '<span class="point circle"></span>'),
        croix: Point = new Point('player2', '<span class="point croix"></span>');

    let container = document.querySelector(".container") as HTMLDivElement,
        currentPlayerHTML = document.querySelector(".current-player") as HTMLElement;
        
    tableGame.init()
    container.onclick = (e: MouseEvent) => {
        let target = e.target as HTMLDivElement,
            coords = target.id.split(";"),
            x = Number(coords[0]),
            y = Number(coords[1]);
    
        // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
        if (
            target.innerHTML.length > 0 ||
            coords.length !== 2 ||
            tableGame.isWinning
        )
            return;
    
        tableGame.drawPoint(target);
        tableGame.pushCoords(x, y);
        tableGame.isWinning = tableGame.checkWinner();
        // player 1 : circle; player 2: croix
        // change currentPlayer and currentPointHTML
        if (tableGame.currentPlayer === 1) {
            // tableGame.checkWinner(circle, x, y);
            tableGame.currentPlayer = 2;
            tableGame.currentPointHTML = croix.pointHTML;
            currentPlayerHTML.innerHTML = croix.pointHTML;
            // si gagnant
            if(tableGame.isWinning) {
                circle.win()
                btnResult()
            }
        } else {
            // tableGame.checkWinner(croix, x, y);
            tableGame.currentPlayer = 1;
            tableGame.currentPointHTML = circle.pointHTML;
            currentPlayerHTML.innerHTML = circle.pointHTML;
            // si gagnant
            if(tableGame.isWinning) {
                croix.win()
                btnResult()
            }
        }
    };    
    
    function btnResult() {
        let btnReset = document.querySelector("button.reset") as HTMLButtonElement,
            btnContinue = document.querySelector("button.continue") as HTMLButtonElement;
        btnReset.onclick = () => {
            tableGame.reset(circle, croix)
            currentPlayerHTML.innerHTML = circle.pointHTML
        }
        btnContinue.onclick = () => {
            tableGame.continue()
        }
    }
})()
