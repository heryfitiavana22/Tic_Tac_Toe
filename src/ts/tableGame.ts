class TableGame {
    currentPlayer = 1;
    isWinning = false;
    // dimension
    dimensionX: number;
    dimensionY: number;
    // currentPoint: Point = circle;
    currentPointHTML = '<span class="point circle"></span>';
    currentPlayerHTML = document.querySelector(
        ".current-player"
    ) as HTMLElement;
    // matrice d'adjacence qui represente le table (1 => player1; 2 => player2; 0 => case vide)
    _adjacentMatrix: AdjacentMatrix = [];

    constructor(x: number, y: number) {
        this.dimensionX = x;
        this.dimensionY = y;
    }

    init() {
        this.isWinning = false;
        this._adjacentMatrix = [];
        this.createAdjacentMatrix();
        this.drawTable();

        let container = document.querySelector(".container > div") as HTMLDivElement;
        container.className = "table-game"
    }

    drawTable() {
        let casesHTML = ``;
        for (let i = 0; i < this.dimensionX; i++) {
            for (let j = 0; j < this.dimensionY; j++) {
                casesHTML += `<div class="case" id="${i};${j}"></div>`;
            }
        }
        (document.querySelector(".container > div") as HTMLElement).innerHTML =
            casesHTML;
    }

    createAdjacentMatrix() {
        for (let i = 0; i < this.dimensionX; i++) {
            this._adjacentMatrix.push([0, 0, 0]);
        }
    }

    pushCoords(x: number, y: number) {
        this._adjacentMatrix[x][y] = this.currentPlayer;
        // console.log(this.adjacentMatrix);
    }

    drawPoint(x: number, y: number) {
        let caseHTML = document.getElementById(`${x};${y}`) as HTMLDivElement;
        caseHTML.innerHTML = this.currentPointHTML;
        caseHTML.style.cursor = "not-allowed";
    }

    showResult(isDraw: boolean) {
        let resultHTML = document.querySelector(".result") as HTMLDivElement;
        resultHTML.innerHTML = `
            <div class="winner">${
                isDraw ? "DRAW !!" : `PLAYER ${this.currentPlayer} WON !`
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

    checkWinner() {
        let p = this.currentPlayer;
        // convertir la matrice d'adjacence en string pour faciliter la verification
        // ex : 1,0,0,1,0,0,1,0,0 => 100100100
        let coords = this._adjacentMatrix.toString().split(",").join(""),
            // ex : 100100100, 010010010, 001001001 (1 => player1; 2 => player2; 0 => case vide)
            col = new RegExp(
                `(2|1|0){0,2}[${p}](2|1|0){2}[${p}](2|1|0){2}[${p}](2|1|0){0,2}`
            ),
            // ex : 111000000, 000111000, 000000111 (1 => player1; 2 => player2; 0 => case vide)
            row = new RegExp(
                `([${p}]{3}(2|1|0){6})|((2|1|0){3}[${p}]{3}(2|1|0){3})|((2|1|0){6}[${p}]{3})`
            ),
            // ex : 100010001 (1 => player1; 2 => player2; 0 => case vide)
            diagonal = new RegExp(`[${p}](2|1|0){3}[${p}](2|1|0){3}[${p}]`),
            // ex : 001010100 (1 => player1; 2 => player2; 0 => case vide)
            contreDiagonal = new RegExp(
                `(2|1|0){2}[${p}](2|1|0){1}[${p}](2|1|0){1}[${p}](2|1|0){2}`
            );

        // console.log(coords);
        if (col.test(coords)) {
            console.log("winner circle col" + p);
            // chercher l'indice de depart pour tracer la ligne
            for (let i = 0; i < this.dimensionX; i++) {
                let colValue = [],
                    // 1,1,1 ou 2,2,2
                    sequence = this.currentPlayer
                        .toString()
                        .repeat(3)
                        .split("")
                        .join(",");
                for (let j = 0; j < this.dimensionX; j++) {
                    colValue.push(this._adjacentMatrix[j][i]);
                }

                if (colValue.toString() === sequence) {
                    // i correspond à la colonne
                    let beginCaseHTML = document.getElementById(
                        `${0};${i}`
                    ) as HTMLDivElement;
                    beginCaseHTML.insertAdjacentHTML(
                        "beforeend",
                        '<span class="line col"></span>'
                    );
                    let line = document.querySelector(
                        ".line"
                    ) as HTMLSpanElement;
                    // animation
                    setTimeout(() => {
                        line.style.height = "300px";
                    }, 10);
                    // display result
                    this.showResult(false);
                    return true;
                }
            }
            return false;
        }
        if (row.test(coords)) {
            console.log("winner circle row" + p);
            for (let i = 0; i < this.dimensionX; i++) {
                // 1,1,1 ou 2,2,2
                let sequence = this.currentPlayer
                    .toString()
                    .repeat(3)
                    .split("")
                    .join(",");
                // prendre la ligne en un coup avec this.adjacentMatrix[i]
                if (this._adjacentMatrix[i].toString() === sequence) {
                    // i correspond à la ligne
                    let beginCaseHTML = document.getElementById(
                        `${i};${0}`
                    ) as HTMLDivElement;
                    beginCaseHTML.insertAdjacentHTML(
                        "beforeend",
                        '<span class="line row"></span>'
                    );
                    let line = document.querySelector(
                        ".line"
                    ) as HTMLSpanElement;
                    // animation
                    setTimeout(() => {
                        line.style.width = "300px";
                    }, 10);
                    // display result
                    this.showResult(false);
                    return true;
                }
            }
            return false;
        }
        if (diagonal.test(coords)) {
            console.log("winner circle diagonal" + p);
            // depart 0;0
            let beginCaseHTML = document.getElementById(
                `0;0`
            ) as HTMLDivElement;
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
            this.showResult(false);
            return true;
        }
        if (contreDiagonal.test(coords)) {
            console.log("winner circle contrediagonal" + p);
            // 0;2
            let beginCaseHTML = document.getElementById(
                `0;2`
            ) as HTMLDivElement;
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
            this.showResult(false);
            return true;
        }
        // au cas où il n'y a plus de case vide mais pas de vainquer
        if (!coords.includes("0")) {
            console.log("draw");
            // display result
            this.showResult(true);
            return true;
        }
        return false;
    }

    reset(circle: Point, croix: Point) {
        this.init();
        this.currentPlayer = 1;
        this.currentPointHTML = circle.pointHTML;
        this.currentPlayerHTML.innerHTML = circle.pointHTML
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

    permutation(circle: Point, croix: Point, socket?: any) {
        // player 1 : circle; player 2: croix
        // change currentPlayer and currentPointHTML
        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
            this.currentPointHTML = croix.pointHTML;
            this.currentPlayerHTML.innerHTML = croix.pointHTML;
            // si gagnant
            if (this.isWinning) {
                circle.win();
                this.btnResult(circle, croix, socket);
            }
        } else {
            this.currentPlayer = 1;
            this.currentPointHTML = circle.pointHTML;
            this.currentPlayerHTML.innerHTML = circle.pointHTML;
            // si gagnant
            if (this.isWinning) {
                croix.win();
                this.btnResult(circle, croix, socket);
            }
        }
    }

    btnResult(circle: Point, croix: Point, socket?: SocketType) {
        let btnReset = document.querySelector(
                "button.reset"
            ) as HTMLButtonElement,
            btnContinue = document.querySelector(
                "button.continue"
            ) as HTMLButtonElement;

        btnReset.onclick = () => {
            // seul "home" qui peut clické sur "reset" ou "continue" (si en ligne)
            if (socket && socket.place === "away") return
            // si en ligne et "home" a clické
            if(socket?.place === "home") {
                socket.emitReset()
                return
            }
            this.reset(circle, croix);
        };

        btnContinue.onclick = () => {
            // seul "home" qui peut clické sur "reset" ou "continue" (si en ligne)
            if (socket && socket.place === "away") return
            // si en ligne et "home" a clické
            if(socket?.place === "home") {
                console.log("emit contine");
                
                socket.emitContinue()
                return
            }
            this.continue();
        };
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
