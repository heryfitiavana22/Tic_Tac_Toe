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

    check(dimension: number) {
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
        if (col.test(coords)) {
            console.log("winner circle col");
            // chercher l'indice de depart pour tracer la ligne
            for (let i = 0; i < dimension; i++) {
                let colValue = []
                for (let j = 0; j < dimension; j++) {
                    colValue.push(this.adjacentMatrix[j][i])
                }
                
                if(colValue.toString() === "1,1,1") {
                    // i correspond à la colonne
                    let beginCaseHTML = document.getElementById(`${0};${i}`) as HTMLDivElement
                    beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line col"></span>')
                    let line = document.querySelector('.line') as HTMLSpanElement
                    // animation
                    setTimeout(() => {
                        line.style.height = "300px"
                    }, 10)
                    return true
                }
            }
            return false
        }
        if (row.test(coords)) {
            console.log("winner circle row");
            for (let i = 0; i < dimension; i++) {
                // prendre la ligne en un coup avec this.adjacentMatrix[i]
                if(this.adjacentMatrix[i].toString() === "1,1,1") {
                    // i correspond à la ligne
                    let beginCaseHTML = document.getElementById(`${i};${0}`) as HTMLDivElement
                    beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line row"></span>')
                    let line = document.querySelector('.line') as HTMLSpanElement
                    // animation
                    setTimeout(() => {
                        line.style.width = "300px"
                    }, 10)
                    return true
                }
            }
            return false
        }
        if (diagonal.test(coords)) {
            console.log("winner circle diagonal");
            // depart 0;0
            let beginCaseHTML = document.getElementById(`0;0`) as HTMLDivElement
            beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line rotate"></span>')
            let line = document.querySelector('.line') as HTMLSpanElement
            // animation
            setTimeout(() => {
                line.style.width = "414px"
            }, 10)
            return true
        }
        if (contreDiagonal.test(coords)) {
            console.log("winner circle contrediagonal");
            // 0;2
            let beginCaseHTML = document.getElementById(`0;2`) as HTMLDivElement
            beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line rotate contre"></span>')
            let line = document.querySelector('.line') as HTMLSpanElement
            // animation
            setTimeout(() => {
                line.style.width = "414px"
            }, 10)
            return true
        }
        return false
    }
}

export default Circle;
