import { MovableModel } from "./movable.model";
import { loadImage } from "../utils/utils";
import { GAME_CONFIG } from "../config";

export class MovableView {
    movable: MovableModel;
    
    image?: HTMLImageElement;
    imageHeight: number = 0;
    imageWidth: number = 0;
    
    contextObj: any = {};

    constructor(contextObj: any, movable: MovableModel) {
        this.movable = movable;
        this.contextObj = contextObj;
        loadImage(movable.spriteUrl).then((image) => {
            this.image = image;
            this.imageHeight = Math.round(image.height / 2);
            this.imageWidth = Math.round(image.width / 2);
            this.draw();
        });
    }

    draw() {
        if (this.image) {
            this.contextObj.drawImage(this.image, 
                                      this.movable.location.x, 
                                      this.movable.location.y, 
                                      this.imageWidth, 
                                      this.imageHeight);
        }
    }

    remove() {
        this.contextObj.clearRect(0, 0, GAME_CONFIG.canvas_size.width, GAME_CONFIG.canvas_size.height);
    }

    animate() {
        this.remove();
        this.draw();
    }
}