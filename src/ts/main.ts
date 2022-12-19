import "../css/style.css";
import TableGame from "./tableGame";
import Point from "./point";
import Socket from "./socket"

(() => {

    let btnLocal = document.querySelector("#local") as HTMLButtonElement,
        btnOnline = document.querySelector("#online") as HTMLButtonElement;
    
    let tableGame = new TableGame(3, 3),
        circle: Point = new Point('player1', '<span class="point circle"></span>'),
        croix: Point = new Point('player2', '<span class="point croix"></span>');

    let container = document.querySelector(".container  > div") as HTMLDivElement;

    let socket = new Socket()

    btnLocal.onclick = (e: MouseEvent) => {
        socket.isSocket = false
        socket.isActive = true
        // init table game
        tableGame.init()
        start()
    }

    btnOnline.onclick = (e: MouseEvent) => {
        socket.init(tableGame, circle, croix, socket)
        socket.isSocket = true
        // init table game
        tableGame.init()
        start()
    }
    
    
    function start() {        
        container.onclick = (e: MouseEvent) => {
            let target = e.target as HTMLDivElement,
                coords = target.id.split(";"),
                x = Number(coords[0]),
                y = Number(coords[1]);
        
            // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
            // et si on est autorisé de clické (si en ligne)
            if (
                !socket.isActive ||
                target.innerHTML.length > 0 ||
                coords.length !== 2 ||
                tableGame.isWinning
            )
                return;
                
            // emit point to server if socket
            if(socket.isSocket) {
                // on draw point
                socket.emitPoint(x, y)
                return
            }
            console.log("not socket");
    
            tableGame.drawPoint(x, y);
            tableGame.pushCoords(x, y);
            tableGame.isWinning = tableGame.checkWinner();
            // changement de joueur et verifier s'il a gagné
            tableGame.permutation(circle, croix)
        };   
    }
})()
