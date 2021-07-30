import { CANVAS_HEIGHT, SEA_DEPTH } from "../../consts";
import { Location } from "../../interfaces";
import { Event } from "../../utils/event";
import { MovableModel, MovableObject } from "../../movable/movable.model";

export class ParachutistModel extends MovableModel {
    fallInterval: any;
    hitBottom: Event;

    constructor(movable?: Partial<MovableObject>) {
        super({
            location: {
                x: movable?.location?.x || 0,
                y: movable?.location?.y || 15
            },
            spriteUrl: movable?.spriteUrl || 'assets/parachutist.png',
            move: (): Location => {
                return {
                    x: this.location.x,
                    y: this.location.y + 1
                }
            }
        }); 
        this.hitBottom = new Event();
        this.hitBottom.addListener(() => {
            clearInterval(this.fallInterval);
        });

    }

    start() {
        this.fallInterval = setInterval(
            (function(self) {
                return function() {
                    if (self.location.y < CANVAS_HEIGHT - SEA_DEPTH - self.imageHeight) {
                        self.move();
                    } else {
                        self.hitBottom.trigger(self.location);
                    }
                }
            }(this)),
            10);
    }





    // canvasObj: any;
    // step: number = 1;
    // planeLength: number = 0;
    // location: Location = INITIAL_LOCATION;
    // interval: any = null;

    // constructor(canvasContext: any, location: Location) {
    //     super(canvasContext, 'assets/parachutist.png', location);
    //     if (location) {
    //         this.location = location;
    //     }
    //     this.step = this.step * Math.round(1 + Math.random());
    // }
    
    // fall() {
    //     let newY = this.location.y + this.step;
    //     if (newY > CANVAS_HEIGHT - SEA_DEPTH - this.imageHeight) {
    //         const event = new CustomEvent('land', {
    //             detail: this.location.x
    //         });
    //         window.dispatchEvent(event);
    //         this.stop();
    //         return;
    //     }

    //     this.redraw({
    //         x: this.location.x,
    //         y: newY
    //     });
    // }

    // start() {
    //     this.interval = setInterval(
    //         (function(self) {
    //             return function() {
    //                 self.fall();
    //             }
    //         }(this)),
    //         10);
    // }

    // stop() {
    //     clearInterval(this.interval);
    //     this.remove();
    // }
}