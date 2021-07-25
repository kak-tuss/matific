import { Boat } from "../entities/boat";
import { Parachutist } from "../entities/parachutist";
import { Plane } from "../entities/plane";
import { Sea } from "../entities/sea";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts";
import { loadImage } from "./utils";

export class GameController {
    bgContext: any;
    gameContext: any;
    boatContext: any;
    sea: any;
    plane: any;
    boat: any;
    dropInterval: any;

    scoresElement: any;
    score: number = 0;
    lives: number = 3;
    constructor(
        scoresElement: any,
        bgCanvasObj: any, 
        canvasObj: any, 
        boatCanvasObj: any
    ){
        this.scoresElement = scoresElement;
        this.bgContext = bgCanvasObj.getContext("2d");
        this.gameContext = canvasObj.getContext("2d");
        this.boatContext = boatCanvasObj.getContext("2d");
    }

    init() {
        this.loadBGAssets().then(() => {
            this.sea = new Sea(this.bgContext);
        });
        this.plane = new Plane(this.gameContext);
        this.plane.start();

        this.boat = new Boat(this.boatContext);
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.boat.moveLeft();
            }
            if (e.key === 'ArrowRight') {
                this.boat.moveRight();
            }
        });

        window.addEventListener('land', (e: any) => {
            this.recalculateScores(e.detail);
        })
        
        this.updateScores();
        this.drop();   
    }

    stop() {
        this.plane.stop();
        this.plane.remove();
        clearInterval(this.dropInterval);
    }

    drop() {
        this.dropInterval = setInterval(
            (function(self) {
                return function() {
                    if (Math.round(Math.random() * 10) % 5 === 0) {
                        self.jump();
                    }
                }
            }(this)),
        500);
    }

    jump() {
        const x = this.plane.location.x + Math.round(this.plane.imageWidth / 2);
        const y = this.plane.imageHeight + 5;

        const parachutist = new Parachutist(this.gameContext, {
            x: x,
            y: y
        });
        parachutist.start();
    }

    loadBGAssets(): Promise<any>{
        return loadImage('assets/background.png').then((image) => {
            this.bgContext.drawImage(image,0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        });
    }
    
    recalculateScores(dropLocation: number) {
        if (this.boat.location.x < dropLocation &&
            dropLocation < this.boat.location.x + this.boat.imageWidth) {
                this.score+=10;
        } else {
            this.lives--;
        }

        if (this.lives === 0) {
            this.stop();
        }
        
        this.updateScores();
    }

    updateScores() {
        this.scoresElement.innerText = `SCORE: ${this.score} LIVES: ${this.lives}`;
    }



    

}