import "../css/style.css";
import HandleButtonGame from "./game/HandleButtonGame"
import User from "./user/User"
import UserForm from "./user/UserForm"

class App {
    main() {        
        // if not exist
        if(!User.isExist()) {
            let userForm = new UserForm()
            userForm.render()
            return
        }

        let handleButtonGame = new HandleButtonGame()
        handleButtonGame.render()
    }
}

let app = new App()
app.main()