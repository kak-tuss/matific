import { Location } from "../interfaces";
import { Event } from "../utils/utils";
export interface MovableObject {
    location: Location;
    spriteUrl: string;
    move: Function;
}

export const EMPTY_MOVABLE: MovableObject = {
    location: {
        x: 0, 
        y: 0
    },
    spriteUrl: '',
    move : () => {},
}

export class MovableModel {
    location: Location;
    spriteUrl: string;
    move: Function;

    onChange: Event;
    imageWidth: number = 0;
    imageHeight: number = 0;

    constructor(
        {location, spriteUrl, move}: MovableObject = EMPTY_MOVABLE
    ){
        this.location = location;
        this.spriteUrl = spriteUrl;
        this.move = (params: any) => {
            this.location = move(params);
            this.onChange.trigger({});
        }
        this.onChange = new Event();
    }

}