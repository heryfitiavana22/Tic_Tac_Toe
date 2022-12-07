class TableGame {
    currentPlayer = 1;
    // dimension
    x: number;
    y: number;
    // currentPoint: Point = circle;
    private _currentPointHTML = '<span class="point circle"></span';

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    drawTable() {
        let casesHTML = ``;
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                casesHTML += `<div class="case" id="${i};${j}"></div>`;
            }
        }
        (document.querySelector(".container") as HTMLElement).innerHTML =
            casesHTML;
    }

    drawPoint(caseHTML: HTMLDivElement) {
        // if there is a point
        if (caseHTML.innerHTML.length > 0) return;

        caseHTML.innerHTML = this._currentPointHTML;
        caseHTML.style.cursor = "not-allowed";
        // player 1 : circle; player 2: croix
        // change currentPointHTML , currentPlayer and currentPoint
        if (this.currentPlayer === 1) {
            return (this._currentPointHTML =
                '<span class="point croix"></span>');
        }

        this._currentPointHTML = '<span class="point circle"></span';
    }

    getCoordsWinner(): CoordsWinner[] {
        // sequence des coordonnée gagnant
        let coordsWinner: CoordsWinner[] = [];

        let diagonal: Coordinate[] = [];
        for (let i = 1; i <= this.x; i++) {
            let col: Coordinate[] = [],
                row: Coordinate[] = [];
            for (let j = 1; j <= this.y; j++) {
                col.push([i, j]);
                row.push([j, i]);
            }
            coordsWinner.push([col]);
            coordsWinner.push([row]);

            diagonal.push([i, i]);
        }
        coordsWinner.push([diagonal]);
        // contre diagonal
        let contreDiagonal: Coordinate[] = [
            [3, 1],
            [2, 2],
            [1, 3],
        ];
        coordsWinner.push([contreDiagonal]);

        return coordsWinner;
    }

    checkWinner(currentPoint: Point, coordsWinner: CoordsWinner[], x: number, y: number) {
        currentPoint.pushCoords(x, y);
        currentPoint.check(coordsWinner);
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
