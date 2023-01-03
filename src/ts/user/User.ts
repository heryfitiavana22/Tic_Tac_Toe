class User {
    name = "";
    place = ""; // (home ou away)
    currentRoom = "";

    getUSer() {
        this.name = localStorage.getItem("userTTT") as string
        return this.name
    }

    showOpponent() {
        
    }

    static saveToLocalStorage(name: string) {
        localStorage.setItem('userTTT', name)
    }

    static isExist() {
        return localStorage.getItem("userTTT") ? true : false
    }
}

export default User
