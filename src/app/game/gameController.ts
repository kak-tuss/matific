import { CANVAS_WIDTH } from "./consts";
import { BoatModel } from "./entities/boat/boatModel";
import { PlaneModel } from "./entities/plane/planeModel";
import { GameView } from "./gameView";
import { Score, Location } from "./interfaces";
import { Event } from "./utils/utils";

export class GameController {
    scores: Score = {
        score: 0,
        lives: 3
    }

    gameView: GameView;
    plane: PlaneModel;
    boat: BoatModel;

    planeInterval: any;
    parachutistsInterval: any;

    scoresUpdated: Event;

    constructor(
        gameView: GameView
    ) {
        this.gameView = gameView;
        this.plane = this.gameView.planeView.movable;
        this.boat = this.gameView.boatView.movable;

        this.scoresUpdated = new Event();
    }

    startGame() {
        this.updateScores();
        this.startPlane();
        this.dropParachutists();
    }

    stopGame() {
        clearInterval(this.planeInterval);
        clearInterval(this.parachutistsInterval);
    }

    startPlane() {
        this.planeInterval = setInterval(
            (function(self) {
                return function() {
                    self.plane.move();
                }
            }(this)),
            10);
    }

    dropParachutists() {
        this.parachutistsInterval = setInterval(
            (function(self) {
                return function() {
                    if (Math.round(Math.random() * 10) % 5 === 0 && 
                    self.plane.location.x > 0 &&
                    self.plane.location.x < CANVAS_WIDTH - self.plane.imageWidth) {
                        self.drop();
                    }
                }
            }(this)),
        500);
    }

    drop() {
        const x = this.plane.location.x + Math.round(this.plane.imageWidth / 2);
        const y = this.plane.imageHeight + 5;
        const parachutist = this.gameView.createParachutist({x: x, y: y});

        parachutist.start();
        parachutist.hitBottom.addListener((location: Location) => {
            this.recalculateScores(location);
        });
    }

    recalculateScores(dropLocation: Location) {
        if (this.boat.location.x < dropLocation.x &&
            dropLocation.x < this.boat.location.x + this.boat.imageWidth) {
                this.scores.score+=10;
            } else {
                this.scores.lives--;
            }

        if (this.scores.lives === 0) {
            this.stopGame();
        }

        this.updateScores();
    }

    updateScores() {
        this.gameView.scores.innerText = `SCORE: ${this.scores.score} LIVES: ${this.scores.lives}`;
    }
}
