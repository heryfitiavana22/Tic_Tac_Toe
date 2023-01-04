// exemple matrice d'adjacence inital
// [ [0,0,0] [0,0,0] [0,0,0 ]]
declare type AdjacentMatrix = [...number[]][];
declare interface player {
    id: string,
    room: string, 
    name: string
}

declare class Point {
    _score: number;
    _scoreHTML: HTMLElement;
    _namePlayer: string;
    pointHTML: string;
    init(namePlayer?: string): void;
    reset(): void;
    win(): void;
}

declare class User {
    name: string;
    place: string;
    currentRoom: string;
    nameOpponent: string;
    getUSer(): string
    static isExist(): boolean
    static saveToLocalStorage(): void
}

