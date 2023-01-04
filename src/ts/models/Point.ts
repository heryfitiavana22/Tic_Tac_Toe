class Point {
    _score = 0;
    _scoreHTML: HTMLElement;
    _namePlayer: string;
    pointHTML: string;
    constructor(name: string, p: string) {
        this._namePlayer = name
        this.pointHTML = p
        this._scoreHTML = document.querySelector(`.${this._namePlayer} .score`) as HTMLSpanElement
    }
    
    init(namePlayer?: string) {
        this._namePlayer = namePlayer ? namePlayer : this._namePlayer
        this._scoreHTML = document.querySelector(`.${this._namePlayer} .score`) as HTMLSpanElement
    }

    reset() {
        this._score = 0
        this._scoreHTML.innerHTML = this._score.toString()
        console.log("reset");
        
    }

    win() {
        this._score++;
        this._scoreHTML.innerHTML = this._score.toString()
    }
}

export default Point;
