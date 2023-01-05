import HandleButtonGame from "../game/HandleButtonGame"
import User from "./User";

class UserForm {
    render() {
        let container = document.querySelector(".container  > div") as HTMLDivElement;
        container.className = "user-form"
        container.innerHTML = `
            <p>Username :</p>
            <input type="text" name="name" id="name" placeholder="username">
            <button class="btn">Enregistrer</button>
        `
        this.handleButton()
    }

    private handleButton() {
        let button = document.querySelector(".user-form button") as HTMLButtonElement;
        // enregistrer
        button.onclick = (e: MouseEvent) => {
            let inputName = document.querySelector("input") as HTMLInputElement,
                handleButtonGame = new HandleButtonGame();

            if(inputName.value.length === 0) return

            User.saveToLocalStorage(inputName.value)
            // choice game (local or online)
            handleButtonGame.render()
        }
    }
}

export default UserForm
