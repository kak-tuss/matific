import { loadImage } from "../controller/utils";
import { Location } from "./interfaces";

export class Movable {
    location: Location = {
        x: 0,
        y: 0
    }
    image: any;
    imageWidth: number = 0;
    imageHeight: number = 0;
    contextObj: any;
    spriteUrl: string = '';
    constructor(contextObj: any, spriteUrl: string, initialLocation: Location) {
        this.location = initialLocation;
        this.contextObj = contextObj;
        this.spriteUrl = spriteUrl;

        loadImage(this.spriteUrl).then((image) => {
            this.image = image;
            this.imageHeight = Math.round(image.height / 2);
            this.imageWidth = Math.round(image.width / 2);
            
            this.draw(this.location);
        });
    }    

    draw(location: Location) {
        if (this.image) {
            this.contextObj.drawImage(this.image, location.x, location.y, this.imageWidth, this.imageHeight);
            this.location = location;    
        }
    }

    remove() {
        this.contextObj.clearRect(this.location.x, this.location.y, this.imageWidth, this.imageHeight);
    }

    redraw(location: Location) {
        this.remove();
        this.draw(location);
    }

    getLocation(): Location {
        return this.location;
    }
}