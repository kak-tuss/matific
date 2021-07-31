import { Score } from "./interfaces";
import { Event } from "./utils/utils";

export class Game {
    scores: Score = {
        score: 0,
        lives: 3
    }
    onChange: Event = new Event();
    constructor() { }

    catch() {
        this.scores.score+=10;
        this.onChange.trigger(this.scores);
    }

    miss() {
        this.scores.lives--;
        if (this.scores.lives < 0) this.scores.lives = 0;
        this.onChange.trigger(this.scores);
    }
}