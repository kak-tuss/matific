import { CANVAS_WIDTH } from "../controller/consts";
import { Location } from "./interfaces";
import { Movable } from "./movable";

const INITIAL_LOCATION = {
    x: CANVAS_WIDTH, 
    y: 3
}
export class Plane extends Movable {
    canvasObj: any;
    speed: number = 10;
    planeLength: number = 0;
    location: Location = INITIAL_LOCATION;
    interval: any = null;
    constructor(canvasContext: any, speed?: number) {
        super(canvasContext, 'assets/plane.png', INITIAL_LOCATION);

        if (speed) {
            this.speed = speed;
        }
    }
    
    fly() {
        let newX = this.location.x - 1;
        if (newX < -this.imageWidth) {
            newX = CANVAS_WIDTH;
        }

        this.redraw({
            x: newX,
            y: this.location.y
        });
    }

    start() {
        this.interval = setInterval(
            (function(self) {
                return function() {
                    self.fly();
                }
            }(this)),
            this.speed);
    }

    stop() {
        clearInterval(this.interval);
    }


}