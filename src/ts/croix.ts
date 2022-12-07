import Point from "./point";

class Croix extends Point {
    createAdjacentMatrix(x: number, y: number) {
        for(let i=0; i<x; i++) {
            for(let j=0; j<y; j++) {
                this.adjacentMatrix.push([0,0,0])
            }
        }
    }

    pushCoords(x: number, y: number) {
        // this.adjacentMatrix[x][y] = 1
    }

    check(coordsWinner: CoordsWinner[]) {
        
        let coords = this.adjacentMatrix.toString()
        // console.log(coords);
        
        if(coords.includes("1,1,1")){
            console.log("winner croix");
            
        }
    }
}

function push<T>(U: T[], V: T[]): T[] {
    return U.length === 0 ? [...V] : [...U, ...V]
}

export default Croix;
