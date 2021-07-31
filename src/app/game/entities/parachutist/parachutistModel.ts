import { CANVAS_HEIGHT, SEA_DEPTH } from "../../consts";
import { Location } from "../../interfaces";
import { Event } from "../../utils/utils";
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
}