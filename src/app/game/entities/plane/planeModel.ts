import { CANVAS_WIDTH } from "../../consts";
import { MovableModel, MovableObject } from "../../movable/movable.model";

export class PlaneModel extends MovableModel {
    constructor(movable?: Partial<MovableObject>) {
        super({
            location: {
                x: movable?.location?.x || CANVAS_WIDTH,
                y: movable?.location?.y || 3
            },
            spriteUrl: movable?.spriteUrl || 'assets/plane.png',
            move: () => {
                if (this.location.x > -1 * this.imageWidth) {
                    return {
                        x: this.location.x - 1,
                        y: this.location.y
                    }                
                } else {
                    return {
                        x: CANVAS_WIDTH,
                        y: this.location.y
                    }
                }
            }
        });        
    }
}
