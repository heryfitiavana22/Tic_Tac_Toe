export function waitingForOpponent() {
    let container = document.querySelector(".container  > div") as HTMLDivElement;
    container.className = "wait-opponent"
    container.innerHTML =
    `<h2>Available opponent :</h2>
    <ul class="list-opponent">
        
    </ul>
    <div class="animation">
        <div class="bar b1 odd"></div>
        <div class="bar b2 even"></div>
        <div class="bar b3 odd"></div>
        <div class="bar b4 even"></div>
    </div>`
    let animation = document.querySelector(".animation") as HTMLDivElement;
    animation.classList.add("loading")
}

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

export function setMessage(message: string) {
    let messageHTML = document.querySelector(".message") as HTMLParagraphElement
    messageHTML.innerHTML = message
    messageHTML.style.opacity = "1"
    setTimeout(() => {
        messageHTML.style.opacity = "0"
        messageHTML.innerHTML = ""
    }, 1000)
}
