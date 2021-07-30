import { CANVAS_HEIGHT, SEA_DEPTH } from "../../consts";
import { MovableModel } from "../../movable/movable.model";

export class SeaModel extends MovableModel {

    constructor() {
        super({
            location: {
                x: 0,
                y: CANVAS_HEIGHT - SEA_DEPTH
            },
            spriteUrl: 'assets/sea.png',
            move: () => {}
        });
    }

    getSeaLevel(): number {
        return CANVAS_HEIGHT - SEA_DEPTH;
    }
}