export function showAvailableOpponent(list: player[]): HTMLUListElement {
    let container = document.querySelector(".container  > div") as HTMLDivElement,
        ul = document.querySelector("ul.list-opponent") as HTMLUListElement,
        listHTML = ``;

    container.className = "wait-opponent";
    for(let e of list) {
        // ex : room1, room2, ...
        let idRoom = e.room.slice(e.room.indexOf("m")+1)
        listHTML += `<li id="${e.id};${idRoom}">${e.id}</li>`
    }   

    ul.innerHTML = listHTML
    return ul
}