import { CANVAS_HEIGHT, SEA_DEPTH } from "../controller/consts";
import { Location } from "./interfaces";
import { Movable } from "./movable";

const INITIAL_LOCATION = {
    x: 0, 
    y: 15
}
export class Parachutist extends Movable {
    canvasObj: any;
    step: number = 1;
    planeLength: number = 0;
    location: Location = INITIAL_LOCATION;
    interval: any = null;

    constructor(canvasContext: any, location: Location) {
        super(canvasContext, 'assets/parachutist.png', location);
        if (location) {
            this.location = location;
        }
        this.step = this.step * Math.round(1 + Math.random());
    }
    
    fall() {
        let newY = this.location.y + this.step;
        if (newY > CANVAS_HEIGHT - SEA_DEPTH - this.imageHeight) {
            const event = new CustomEvent('land', {
                detail: this.location.x
            });
            window.dispatchEvent(event);
            this.stop();
            return;
        }

        this.redraw({
            x: this.location.x,
            y: newY
        });
    }

    start() {
        this.interval = setInterval(
            (function(self) {
                return function() {
                    self.fall();
                }
            }(this)),
            10);
    }

    stop() {
        clearInterval(this.interval);
        this.remove();
    }
}