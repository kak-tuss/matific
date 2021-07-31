import { MovableModel } from "./movable.model";
import { loadImage } from "../utils/utils";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../consts";

export class MovableView {
    movable: MovableModel;
    
    image?: HTMLImageElement;
    
    contextObj: any = {};

    constructor(contextObj: any, movable: MovableModel) {
        this.movable = movable;
        this.contextObj = contextObj;
        loadImage(movable.spriteUrl).then((image) => {
            this.image = image;
            this.movable.imageHeight = Math.round(image.height / 2);
            this.movable.imageWidth = Math.round(image.width / 2);
            this.draw();
        });

        movable.onChange.addListener(() => {
            this.animate();
        });
    }

    draw() {
        if (this.image) {
            this.contextObj.drawImage(this.image, 
                                      this.movable.location.x, 
                                      this.movable.location.y, 
                                      this.movable.imageWidth, 
                                      this.movable.imageHeight);
        }
    }

    remove() {
        this.contextObj.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    animate() {
        this.remove();
        this.draw();
    }
}