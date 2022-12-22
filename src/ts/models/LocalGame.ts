import TableGame from "./tableGame";

class LocalGame {
    _tableGame: TableGame;
    _container = document.querySelector(".container  > div") as HTMLDivElement;

    constructor(circle: Point, croix: Point) {
        this._tableGame = new TableGame(3,3)
        this._tableGame.init()
        this.onClickCase(circle, croix)
    }

    onClickCase(circle: Point, croix: Point) {
        this._container.onclick = (e: MouseEvent) => {
            let target = e.target as HTMLDivElement,
                coords = target.id.split(";"),
                x = Number(coords[0]),
                y = Number(coords[1]);
        
            // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
            // et si on est autorisé de clické (si en ligne)
            if (
                coords.length !== 2 ||
                target.innerHTML.length > 0 ||
                this._tableGame.getIsWinning
            )
                return;
                
            console.log("not socket");
    
            this._tableGame.drawPoint(x, y);
            this._tableGame.pushCoords(x, y);
            this._tableGame.setIsWinning = this._tableGame.checkWinner();
            // changement de joueur et verifier s'il a gagné
            this._tableGame.permutation(circle, croix)
        };  
    }
}

export default LocalGame