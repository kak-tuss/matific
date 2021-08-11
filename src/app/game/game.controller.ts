import { GAME_CONFIG } from "./config";
import { BoatModel } from "./entities/boat/boat.model";
import { ParachutistController } from "./entities/parachutist/parachutist.controller";
import { PlaneModel } from "./entities/plane/plane.model";
import { Game } from "./game.model";
import { GameView } from "./game.view";

export class GameController {

    app: any;

    game: Game;
    gameView: GameView;

    planeInterval: any;
    parachutistsInterval: any;

    parachutists: any[] = [];

    constructor(
        app: any, 
        scoresElement: any
    ) {
        this.app = app;
        const boat = new BoatModel({
                x: Math.round(GAME_CONFIG.canvas_size.width / 2 - 60),
                y: GAME_CONFIG.canvas_size.height - GAME_CONFIG.canvas_size.sea_depth - 40
        });
        
        const plane = new PlaneModel({
            x: GAME_CONFIG.canvas_size.width,
            y: 10
        });
        
        this.game = new Game(boat, plane);

        this.gameView = new GameView(app, scoresElement, this.game);
        this.gameView.init();
    

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.game.boat.location = this.game.boat.move(false);
            }
            if (e.key === 'ArrowRight') {
                this.game.boat.location = this.game.boat.move(true);
            }
            this.gameView.renderBoat();
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
                    self.game.plane.location = self.game.plane.move();
                    self.gameView.renderPlane();
                }
            }(this)),
            GAME_CONFIG.plane.speed);
    }

    dropParachutists() {
        this.parachutistsInterval = setInterval(
            (function(self) {
                return function() {
                    if (Math.round(Math.random() * 10) % 5 === 0 && 
                    self.game.plane.location.x > 0 &&
                    self.game.plane.location.x < GAME_CONFIG.canvas_size.width - self.gameView.planeView.imageWidth) {
                        const x = self.game.plane.location.x + Math.round(self.gameView.planeView.imageWidth / 2);
                        const y = self.gameView.planeView.imageHeight + 5;
                        let parachutistController = new ParachutistController(self.app, {x, y});
                        parachutistController.start();
                        parachutistController.hitBottom.addListener((x: number) => self.checkHit(x));
                    }
                }
            }(this)),
        500);
    }

    checkHit(x: number) {
        if (this.game.boat.location.x < x &&
            x < this.game.boat.location.x + this.gameView.boatView.imageWidth) {
                this.catch();
            } else {
                this.miss();
            }
    }

    catch() {
        this.game.scores.score+=10;
        this.gameView.updateScores(this.game.scores);
    }

    miss() {
        this.game.scores.lives--;
        if (this.game.scores.lives < 0) this.game.scores.lives = 0;
        this.gameView.updateScores(this.game.scores);
        if (this.game.scores.lives <= 0) {
            this.stopGame();
        }
    }

}
