declare type Coordinate = [number, number];
declare type CoordsWinner = [Coordinate[]];
declare type AdjacentMatrix = [...number[]][];

declare class Point {
    score: number;
    scoreHTML: HTMLElement;
    pointHTML: string;
    namePlayer: string;
    init(): void
    win(): void
}

// declare class TableGame {
//     currentPlayer: number;
//     dimensionX: number;
//     dimensionY: number;
//     private _currentPointHTML: string;
// }
