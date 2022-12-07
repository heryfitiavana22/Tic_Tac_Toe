import Point from "./point";

class Circle extends Point {
    createAdjacentMatrix(x: number, y: number) {
        for (let i = 0; i < x; i++) {
            this.adjacentMatrix.push([0, 0, 0]);
        }
        // console.log(this.adjacentMatrix);
    }

    pushCoords(x: number, y: number) {
        this.adjacentMatrix[x][y] = 1;
        // console.log(this.adjacentMatrix);
    }

    check(coordsWinner: CoordsWinner[]) {
        // convertir la matrice d'adjacence en string pour faciliter la verification
        // ex : 1,0,0,1,0,0,1,0,0 => 100100100
        let coords = this.adjacentMatrix.toString().split(",").join(""),
            // ex : 100100100, 010010010, 001001001
            col = /(1|0){0,2}[1](1|0){2}[1](1|0){2}[1](1|0){0,2}/,
            // ex : 111000000, 000111000, 000000111
            row = /([1]{3}(1|0){6})|((1|0){3}[1]{3}(1|0){3})|((1|0){6}[1]{3})/,
            // ex : 100010001
            diagonal = /[1](1|0){3}[1](1|0){3}[1]/,
            // ex : 001010100
            contreDiagonal = /(1|0){2}[1](1|0){1}[1](1|0){1}[1](1|0){2}/;
        console.log(coords);
        if(col.test(coords)) {
            console.log("winner circle col"); 
        }
        if(row.test(coords)) {
            console.log("winner circle row");
        }
        if(diagonal.test(coords)) {
            console.log("winner circle diagonal");
        }
        if(contreDiagonal.test(coords)) {
            console.log("winner circle contrediagonal");
        }
    }
}

export default Circle;
