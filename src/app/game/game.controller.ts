import { CANVAS_WIDTH } from "./consts";
import { BoatModel } from "./entities/boat/boatModel";
import { PlaneModel } from "./entities/plane/planeModel";
import { Game } from "./game.model";
import { GameView } from "./game.view";
import { Score, Location } from "./interfaces";
import { Event } from "./utils/utils";

export class GameController {
    game: Game = new Game();

    gameView: GameView;
    plane: PlaneModel;
    boat: BoatModel;

    planeInterval: any;
    parachutistsInterval: any;

    constructor(
        app: any, 
        scoresElement: any
    ) {
        this.gameView = new GameView(app, scoresElement, this.game);
        this.gameView.init();
    
    
        this.plane = this.gameView.planeView.movable;
        this.boat = this.gameView.boatView.movable;

        this.game.onChange.addListener((score: Score) => {
            if (score.lives === 0) {
                this.stopGame();
            }
        });
    }

    startGame() {
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
        const parachutist = this.gameView.createParachutist({x, y});

        parachutist.start();
        parachutist.hitBottom.addListener((location: Location) => {
            this.play(location);
        });
    }

    play(dropLocation: Location) {
        if (this.boat.location.x < dropLocation.x &&
            dropLocation.x < this.boat.location.x + this.boat.imageWidth) {
                this.game.catch();
            } else {
                this.game.miss();
            }
    }
}
