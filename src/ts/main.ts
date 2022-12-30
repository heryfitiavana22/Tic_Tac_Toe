import "../css/style.css";
import Point from "./models/point";
import LocalGame from "./LocalGame"
import OnlineGame from "./OnlineGame"

class App {
    _circle: Point;
    _croix: Point;
    _btnLocal: HTMLButtonElement;
    _btnOnline: HTMLButtonElement;
    constructor() {
        this._btnLocal = document.querySelector("#local") as HTMLButtonElement
        this._btnOnline = document.querySelector("#online") as HTMLButtonElement;
        this._circle = new Point('player1', '<span class="point circle"></span>'),
        this._croix = new Point('player2', '<span class="point croix"></span>');
    }
    main() {
        this._btnLocal.onclick = (e: MouseEvent) => {
            let localGame = new LocalGame(this._circle, this._croix)
        }

        this._btnOnline.onclick = (e: MouseEvent) => {
            let socket = new OnlineGame(this._circle, this._croix)
        }
    }
}

let app = new App()
app.main()