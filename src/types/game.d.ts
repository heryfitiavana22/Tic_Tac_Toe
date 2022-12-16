declare type Coordinate = [number, number];
declare type CoordsWinner = [Coordinate[]];
declare type AdjacentMatrix = [...number[]][];

declare class Point {
    score: number;
    scoreHTML: HTMLElement;
    pointHTML: string;
    namePlayer: string;
    init(): void;
    win(): void;
}

declare class TableGame {
    currentPlayer: number;
    dimensionX: number;
    dimensionY: number;
    isWinning: boolean;
    currentPointHTML: string;
    currentPlayerHTML: HTMLElement;
    _adjacentMatrix: AdjacentMatrix;
    init(): void;
    drawTable(): void;
    createAdjacentMatrix(): void;
    pushCoords(x: number, y: number): void;
    drawPoint(x: number, y: number): void;
    showResult(isDraw: boolean): void;
    checkWinner(): boolean;
    reset(circle: Point, croix: Point): void;
    continue(): void;
    permutation(circle: Point, croix: Point, socket?: SocketType): void;
    btnResult(circle: Point, croix: Point): void;
}

declare class SocketType {
    isActive: boolean
    isSocket: boolean
    place: string // (home ou away)
    _currentRoom: string
    _socket: Function
    init(): void
    emitStartGame(): void
    onReady(): void
    waitingForOpponent(): void
    setCurrentPoint(): void
    emitPoint(): void
    onDrawPoint(): void
    toActive(): void
    emitReset(): void
    onReset(tableGame: TableGame, circle: Point, croix: Point): void
    emitContinue(): void
    onContinue(tableGame: TableGame): void
}
