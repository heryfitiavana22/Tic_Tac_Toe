declare type Coordinate = [number, number];
declare type CoordsWinner = [Coordinate[]];
declare type AdjacentMatrix = [...number[]][];

declare class Point {
    // adjacent matrix
    adjacentMatrix: AdjacentMatrix;
    pushCoords: (x: number, y: number) => void;
    check: (coordsWinner: CoordsWinner[]) => void;
    createAdjacentMatrix(x: number, y: number): void;
}

// declare class Circle extends Point {

// }

// declare class Cr extends Point {
//     pushCoords: (x: number, y: number) => void
//     check: (coordsWinner: CoordsWinner[]) => void
// }

declare class TableGame {
    currentPlayer: number;
    x: number;
    y: number;
    private _currentPointHTML: string;
    getCoordsWinner(): Coordinate[];
}
