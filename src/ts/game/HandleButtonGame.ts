import Point from "../models/Point";
import LocalGame from "./LocalGame"
import OnlineGame from "./OnlineGame"
import TableGame from "../models/TableGame";

class HandleButtonGame {
    private _circle: Point;
    private _croix: Point;
    private _btnLocal: HTMLButtonElement;
    private _btnOnline: HTMLButtonElement;
    private _tableGame: TableGame;

    constructor() {
        this._btnLocal = document.querySelector("#local") as HTMLButtonElement
        this._btnOnline = document.querySelector("#online") as HTMLButtonElement;
        this._circle = new Point('player1', '<span class="point circle"></span>'),
        this._croix = new Point('player2', '<span class="point croix"></span>');
        this._tableGame = new TableGame(3, 3)
    }

    render() {
        let container = document.querySelector(".container  > div") as HTMLDivElement;
        container.className = "";
        container.innerHTML = `
            <button class="" id="local">jouer en local</button>
            <button class="" id="online">jouer en ligne</button>
        `;
        this.handleButton()
        
    }

    private handleButton() {
        this._btnLocal = document.querySelector("#local") as HTMLButtonElement
        this._btnOnline = document.querySelector("#online") as HTMLButtonElement;
        
        this._btnLocal.onclick = (e: MouseEvent) => {
            let localGame = new LocalGame(this._tableGame, this._circle, this._croix)
        }

        this._btnOnline.onclick = (e: MouseEvent) => {
            let socket = new OnlineGame(this._tableGame, this._circle, this._croix)
        }
    }
}

export default HandleButtonGame
