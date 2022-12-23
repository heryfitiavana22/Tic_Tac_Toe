declare type Coordinate = [number, number];
declare type CoordsWinner = [Coordinate[]];
declare type AdjacentMatrix = [...number[]][];
declare interface player {
    id: string,
    room: string, 
    socket: any
}

declare class Point {
    score: number;
    scoreHTML: HTMLElement;
    pointHTML: string;
    namePlayer: string;
    init(): void;
    win(): void;
}

declare class TableGame {
    private _currentPlayer: number;
    private _dimensionX: number;
    private _dimensionY: number;
    private _isWinning: boolean;
    private _currentPointHTML: string;
    private _currentPlayerHTML: HTMLElement;
    private _adjacentMatrix: AdjacentMatrix;
    init(): void;
    drawTable(): void;
    createAdjacentMatrix(): void;
    pushCoords(x: number, y: number): void;
    drawPoint(x: number, y: number): void;
    showResult(isDraw: boolean): void;
    checkWinner(): boolean;
    reset(circle: Point, croix: Point): void;
    continue(): void;

    get getIsWinning(): boolean
    set setIsWinning(value: boolean)
}

// declare class SocketType {
//     isActive: boolean
//     isSocket: boolean
//     place: string // (home ou away)
//     myName: string;
//     _currentRoom: string
//     _socket: Function
//     init(tableGame: TableGame, circle: Point, croix: Point, socket: any): void
//     emitStartGame(): void
//     onReady(): void
//     waitingForOpponent(): void
//     setCurrentPoint(): void
//     emitPoint(): void
//     onDrawPoint(): void
//     toActive(): void
//     emitReset(): void
//     onReset(tableGame: TableGame, circle: Point, croix: Point): void
//     emitContinue(): void
//     onContinue(tableGame: TableGame): void
// }
