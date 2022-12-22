class Point {
    score = 0;
    scoreHTML: HTMLElement;
    pointHTML: string;
    namePlayer: string;
    constructor(name: string, p: string) {
        this.namePlayer = name
        this.pointHTML = p
        this.scoreHTML = document.querySelector(`.${this.namePlayer} .score`) as HTMLSpanElement
    }
    init() {
        this.score = 0
        this.scoreHTML.innerHTML = this.score.toString()
    }

    win() {
        this.score++;
        this.scoreHTML.innerHTML = this.score.toString()
    }
}

export default Point;
