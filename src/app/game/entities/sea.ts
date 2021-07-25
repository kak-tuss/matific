import { CANVAS_HEIGHT, CANVAS_WIDTH, SEA_DEPTH } from "../controller/consts";
import { loadImage } from "../controller/utils";

export class Sea {
    depth: number = SEA_DEPTH;
    constructor(canvasContext: any, depth?: number) {
        if (depth) {
            this.depth = depth;
        } 
        this.draw(canvasContext);
    }

    draw(canvasContext: any) {
        loadImage('assets/sea.png').then((image) => {
            canvasContext.drawImage(image,0,CANVAS_HEIGHT - SEA_DEPTH, CANVAS_WIDTH, SEA_DEPTH);
        });
    }

    getSeaLevel(): number {
        return CANVAS_HEIGHT - SEA_DEPTH;
    }
}