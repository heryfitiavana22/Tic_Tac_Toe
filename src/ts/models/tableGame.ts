import { setMessage } from "../func";
import CheckWinning from "./CheckWinning"

class TableGame {
    private _currentPlayer = 1;
    private _isWinning = false;
    // dimension
    private _dimensionX: number;
    private _dimensionY: number;
    // currentPoint: Point = circle;
    private _currentPointHTML = '<span class="point circle"></span>';
    private _currentPlayerHTML = document.querySelector(".current-player") as HTMLElement;
    // matrice d'adjacence qui represente le table (1 => player1; 2 => player2; 0 => case vide)
    private _adjacentMatrix: AdjacentMatrix = [];
    private _checkWinning: CheckWinning;

    constructor(x: number, y: number) {
        this._dimensionX = x;
        this._dimensionY = y;
        this._checkWinning = new CheckWinning(x, y)
    }

    init() {
        this._isWinning = false;
        this._adjacentMatrix = [];
        this.createAdjacentMatrix();
        this.drawTable();

        let container = document.querySelector(".container > div") as HTMLDivElement;
        container.className = "table-game"
    }

    drawTable() {
        let casesHTML = ``;
        for (let i = 0; i < this._dimensionX; i++) {
            for (let j = 0; j < this._dimensionY; j++) {
                casesHTML += `<div class="case" id="${i};${j}"></div>`;
            }
        }
        (document.querySelector(".container > div") as HTMLElement).innerHTML =
            casesHTML;
    }

    createAdjacentMatrix() {
        for (let i = 0; i < this._dimensionX; i++) {
            this._adjacentMatrix.push([0, 0, 0]);
        }
    }

    pushCoords(x: number, y: number) {
        this._adjacentMatrix[x][y] = this._currentPlayer;
        // console.log(this.adjacentMatrix);
    }

    drawPoint(x: number, y: number) {
        let caseHTML = document.getElementById(`${x};${y}`) as HTMLDivElement;
        caseHTML.innerHTML = this._currentPointHTML;
        caseHTML.style.cursor = "not-allowed";
    }

    showResult(isDraw: boolean) {
        let resultHTML = document.querySelector(".result") as HTMLDivElement;
        resultHTML.innerHTML = `
            <div class="winner">${
                isDraw ? "DRAW !!" : `PLAYER ${this._currentPlayer} WON !`
            }</div>
            <div class="btn-container">
                <button class="reset">Reset</button>
                <button class="continue">Continue</button>
            </div>`;
        // attendre pour afficher un peu la ligne
        setTimeout(() => {
            resultHTML.style.transform = "scale(1)";
        }, 500);
    }

    get getIsWinning(): boolean {
        return this._isWinning
    }

    set setIsWinning(value: boolean) {
        this._isWinning = value
    }

    checkWinner() {
        this._checkWinning.setAdjacentMatrix = this._adjacentMatrix
        this._checkWinning.setCurrentPlayer = this._currentPlayer
        // convertir la matrice d'adjacence en string pour faciliter la verification
        // ex : 1,0,0,1,0,0,1,0,0 => 100100100
        this._checkWinning.setStringMatrix = this._adjacentMatrix.toString().split(",").join("")

        
        if(
            (this._checkWinning.checkColumn()) ||
            (this._checkWinning.checkRow()) ||
            (this._checkWinning.checkDiagonal()) || 
            (this._checkWinning.checkDraw())
        ) {
            this.showResult(false)
            return true
        }
    
        if(this._checkWinning.checkDraw()) {
            this.showResult(true)
            return true
        }
        return false
    }

    reset(circle: Point, croix: Point) {
        this.init();
        this._currentPlayer = 1;
        this._currentPointHTML = circle.pointHTML;
        this._currentPlayerHTML.innerHTML = circle.pointHTML
        circle.init();
        croix.init();
        let resultHTML = document.querySelector(".result") as HTMLDivElement;
        resultHTML.style.transform = "scale(0)";
        resultHTML.innerHTML = "";
    }

    continue() {
        this.init();
        let resultHTML = document.querySelector(".result") as HTMLDivElement;
        resultHTML.style.transform = "scale(0)";
        resultHTML.innerHTML = "";
    }

}

function checkDimension(x: number) {
    // if(x !== y) throw new Error("x is not equal to y")
    // if((x < 3) || (x > 5)) throw new Error("dimension between 3 and 5")

    return function (constructor: any, propertykey: string) {
        console.log(constructor);
    };
}

export default TableGame;
