import { CANVAS_HEIGHT, CANVAS_WIDTH, SEA_DEPTH } from "../../consts";
import { MovableModel } from "../../movable/movable.model";

const STEP = 20;
export class BoatModel extends MovableModel {
    constructor() {
        super({
            location: {
                x: Math.round(CANVAS_WIDTH / 2 - 60),
                y: CANVAS_HEIGHT - SEA_DEPTH - 40
            },
            spriteUrl: 'assets/boat.png',
            move: (direction: boolean) => {
                if (direction) {
                    return {
                        x: this.location.x + STEP,
                        y: this.location.y
                    }
                } else {
                    return {
                        x: this.location.x - STEP,
                        y: this.location.y
                    }
                }
            }
        });        
    }    

}