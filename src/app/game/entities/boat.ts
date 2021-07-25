import { CANVAS_HEIGHT, CANVAS_WIDTH, SEA_DEPTH } from "../controller/consts";
import { Movable } from "./movable";

const STEP = 20;
export class Boat extends Movable {
    canvasObj: any;
    seaLevel: number = SEA_DEPTH;
    planeLength: number = 0;
    constructor(canvasContext: any) {
        super(canvasContext, 'assets/boat.png', {
            x: Math.round(CANVAS_WIDTH / 2) - 60,
            y: CANVAS_HEIGHT - SEA_DEPTH - 40
        });
    }
    
    moveLeft() {
        if (this.location.x > -1 * (Math.round(this.imageWidth / 2))) {
            this.redraw({
                x: this.location.x - STEP,
                y: this.location.y
            });
        }
    }

    moveRight() {
        if(this.location.x < CANVAS_WIDTH - Math.round(this.imageWidth / 2)) {
            this.redraw({
                x: this.location.x + STEP,
                y: this.location.y
            });
        }
    }
}