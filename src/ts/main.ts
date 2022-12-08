import "../css/style.css";
import TableGame from "./tableGame";
import Circle from "./circle";
import Croix from "./croix";

let tableGame = new TableGame(3, 3),
    circle: Point = new Circle(0, 0),
    croix: Point = new Croix(0, 0);

tableGame.drawTable();
circle.createAdjacentMatrix(3, 3);
croix.createAdjacentMatrix(3, 3);

let container = document.querySelector(".container") as HTMLDivElement,
    currentPlayerHTML = document.querySelector(".current-player") as HTMLElement;

container.onclick = (e: MouseEvent) => {
    let target = e.target as HTMLDivElement,
        coords = target.id.split(";"),
        x = Number(coords[0]),
        y = Number(coords[1]);

    // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
    if (
        target.innerHTML.length > 0 ||
        coords.length !== 2 ||
        tableGame.isWinning
    )
        return;

    tableGame.drawPoint(target);
    // check winner and change currentPlayer
    if (tableGame.currentPlayer === 1) {
        tableGame.checkWinner(circle, x, y);
        tableGame.currentPlayer = 2;
        currentPlayerHTML.innerHTML = '<span class="point croix"></span>'
    } else {
        tableGame.checkWinner(croix, x, y);
        tableGame.currentPlayer = 1;
        currentPlayerHTML.innerHTML = '<span class="point circle"></span>'
    }
};
