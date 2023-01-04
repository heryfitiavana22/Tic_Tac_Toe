class CheckWinning {
    private _adjacentMatrix: AdjacentMatrix = [];
    private _currentPlayer = 1;
    private _stringMatrix = "";
    private _dimensionX: number;
    private _dimensionY: number;

    constructor(x: number, y: number) {
        this._dimensionX = x
        this._dimensionY = y
    }

    set setAdjacentMatrix(adjacentMatrix: AdjacentMatrix) {
        this._adjacentMatrix = adjacentMatrix;
    }

    set setCurrentPlayer(currentPlayer: number) {
        this._currentPlayer = currentPlayer;
    }

    set setStringMatrix(stringMatrix: string) {
        this._stringMatrix = stringMatrix;
    }

    checkColumn(): boolean {
        let p = this._currentPlayer,
            col = new RegExp(
                `(2|1|0){0,2}[${p}](2|1|0){2}[${p}](2|1|0){2}[${p}](2|1|0){0,2}`
            );

        if (col.test(this._stringMatrix)) {
            // console.log("winner circle col" + p);
            // chercher l'indice de depart pour tracer la ligne
            for (let i = 0; i < this._dimensionX; i++) {
                let colValue = [],
                    // 1,1,1 ou 2,2,2
                    sequence = this._currentPlayer
                        .toString()
                        .repeat(3)
                        .split("")
                        .join(",");
                for (let j = 0; j < this._dimensionX; j++) {
                    colValue.push(this._adjacentMatrix[j][i]);
                }

                if (colValue.toString() === sequence) {
                    // i correspond à la colonne
                    let beginCaseHTML = document.getElementById(`${0};${i}`) as HTMLDivElement;
                    beginCaseHTML.insertAdjacentHTML(
                        "beforeend",
                        '<span class="line col"></span>'
                    );

                    let line = document.querySelector(".line") as HTMLSpanElement;
                    // animation
                    setTimeout(() => {
                        line.style.height = "300px";
                    }, 10);
                    // // display result
                    // this.showResult(false);
                    return true;
                }
            }
        }
        return false;
    }

    checkRow(): boolean {
        let p = this._currentPlayer,
            // ex : 111000000, 000111000, 000000111 (1 => player1; 2 => player2; 0 => case vide)
            row = new RegExp(
                `([${p}]{3}(2|1|0){6})|((2|1|0){3}[${p}]{3}(2|1|0){3})|((2|1|0){6}[${p}]{3})`
            );

        if (row.test(this._stringMatrix)) {
            // console.log("winner circle row" + p);
            for (let i = 0; i < this._dimensionX; i++) {
                // 1,1,1 ou 2,2,2
                let sequence = this._currentPlayer
                    .toString()
                    .repeat(3)
                    .split("")
                    .join(",");
                // prendre la ligne en un coup avec this.adjacentMatrix[i]
                if (this._adjacentMatrix[i].toString() === sequence) {
                    // i correspond à la ligne
                    let beginCaseHTML = document.getElementById(`${i};${0}`) as HTMLDivElement;
                    beginCaseHTML.insertAdjacentHTML(
                        "beforeend",
                        '<span class="line row"></span>'
                    );

                    let line = document.querySelector(".line") as HTMLSpanElement;
                    // animation
                    setTimeout(() => {
                        line.style.width = "300px";
                    }, 10);
                    // display result
                    // this.showResult(false);
                    return true;
                }
            }
        }
        return false
    }

    checkDiagonal(): boolean {
        let p = this._currentPlayer,
            // ex : 100010001 (1 => player1; 2 => player2; 0 => case vide)
            diagonal = new RegExp(`[${p}](2|1|0){3}[${p}](2|1|0){3}[${p}]`);

        if (diagonal.test(this._stringMatrix)) {
            // console.log("winner circle diagonal" + p);
            // depart 0;0
            let beginCaseHTML = document.getElementById(`0;0`) as HTMLDivElement;
            beginCaseHTML.insertAdjacentHTML(
                "beforeend",
                '<span class="line rotate"></span>'
            );
            let line = document.querySelector(".line") as HTMLSpanElement;
            // animation
            setTimeout(() => {
                line.style.width = "414px";
            }, 10);
            // display result
            // this.showResult(false);
            return true;
        }
        return false
    }

    checkContreDiagonal(): boolean {
        let p = this._currentPlayer,
            // ex : 001010100 (1 => player1; 2 => player2; 0 => case vide)
            contreDiagonal = new RegExp(
                `(2|1|0){2}[${p}](2|1|0){1}[${p}](2|1|0){1}[${p}](2|1|0){2}`
            );

        if (contreDiagonal.test(this._stringMatrix)) {
            // console.log("winner circle contrediagonal" + p);
            // 0;2
            let beginCaseHTML = document.getElementById(`0;2`) as HTMLDivElement;
            beginCaseHTML.insertAdjacentHTML(
                "beforeend",
                '<span class="line rotate contre"></span>'
            );

            let line = document.querySelector(".line") as HTMLSpanElement;
            // animation
            setTimeout(() => {
                line.style.width = "414px";
            }, 10);
            // display result
            // this.showResult(false);
            return true;
        }

        return false
    }

    checkDraw() {
        // au cas où il n'y a plus de case vide mais pas de vainquer
        if (!this._stringMatrix.includes("0")) {
            // console.log("draw");
            // display result
            // this.showResult(true);
            return true;
        }
        return false
    }
}

export default CheckWinning;
