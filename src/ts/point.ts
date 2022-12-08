abstract class Point {
    // list coordinate
    adjacentMatrix: AdjacentMatrix = []
    constructor(x: number, y: number) {
        // this.adjacentMatrix[x][y] = 1
    }
    abstract createAdjacentMatrix(x: number, y: number): void
    abstract pushCoords(x: number, y: number): void
    abstract check(dimension: number): boolean
}

export default Point;
